import { GoogleGenerativeAI } from "@google/generative-ai";
import { JobFitAnalysisInput } from "@/types/jobfitanalysis";
import Resume from "@/models/Resume";
import User from "@/models/User";

export async function analyzeJobFit(jobFitData: JobFitAnalysisInput) {
  const genAIapiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
  const genAI = new GoogleGenerativeAI(genAIapiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Validate input data
  const requiredFields: (keyof JobFitAnalysisInput)[] = [
    "resumeId",
    "jobTitle",
    "jobDescription",
  ];

  requiredFields.forEach((field) => {
    if (!jobFitData[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  });

  // Fetch resume details
  const resume = await Resume.findById(jobFitData.resumeId);
  if (!resume) {
    throw new Error("Resume not found");
  }

  const userInfo = await User.findById(resume.userId);
  if (!userInfo) {
    throw new Error("User not found");
  }

  // Prepare resume summary
  const resumeSummary = {
    careerObjective: resume.careerObjective || "",
    professionalExperience: (resume.professionalExperience || [])
      .map(
        (exp) =>
          `${exp.jobTitle || "N/A"} at ${exp.companyName || "N/A"}: 
       Responsibilities: ${
         (exp.responsibilities || []).join(", ") || "No responsibilities listed"
       }
       Accomplishments: ${
         (exp.accomplishments || []).join(", ") || "No accomplishments listed"
       }`
      )
      .join("\n\n"),
    education: (resume.education || [])
      .map(
        (edu) =>
          `${edu.degree || "Degree N/A"} in ${
            edu.fieldOfStudy || "Field N/A"
          } from ${edu.universityName || "University N/A"}`
      )
      .join("\n"),
    skills: {
      technical:
        (resume.skills?.technical || []).join(", ") ||
        "No technical skills listed",
      soft: (resume.skills?.soft || []).join(", ") || "No soft skills listed",
      industrySpecific:
        (resume.skills?.industrySpecific || []).join(", ") ||
        "No industry-specific skills listed",
    },
    projects: (resume.projects || [])
      .map(
        (proj) =>
          `${proj.title || "Untitled Project"}: ${
            proj.description || "No description"
          } (Skills: ${
            (proj.skillsUsed || []).join(", ") || "No skills specified"
          })`
      )
      .join("\n"),
  };

  // Construct the prompt for job fit analysis
  const prompt = `Perform a comprehensive job fit analysis:

Job Details:
- Job Title: ${jobFitData.jobTitle}
- Job Description:
${jobFitData.jobDescription}

Candidate's Resume Summary:
Career Objective: ${resumeSummary.careerObjective}

Professional Experience:
${resumeSummary.professionalExperience}

Education:
${resumeSummary.education}

Skills:
- Technical Skills: ${resumeSummary.skills.technical}
- Soft Skills: ${resumeSummary.skills.soft}
- Industry-Specific Skills: ${resumeSummary.skills.industrySpecific}

Projects:
${resumeSummary.projects}

Analysis Guidelines:
1. Evaluate the overall compatibility between the resume and job description
2. Assess skill match percentage (technical, soft, and industry-specific skills)
3. Identify strengths and potential gaps
4. Provide recommendation on whether to proceed with application
5. Offer specific suggestions for resume improvement if needed
6. Generate a detailed, objective, and constructive analysis

Provide a structured analysis with the following sections:
- Skill Match Percentage
- Experience Alignment
- Key Strengths
- Potential Improvement Areas
- Application Recommendation (Strong Fit / Moderate Fit / Weak Fit)
- Specific Suggestions for Enhancing Job Application`;

  try {
    // Generate job fit analysis
    const result = await model.generateContent(prompt);
    const response = result.response;
    const jobFitAnalysis = response.text();

    return {
      success: true,
      analysis: jobFitAnalysis,
      recommendationScore: calculateRecommendationScore(jobFitAnalysis),
    };
  } catch (error) {
    console.error("Job Fit Analysis Error:", error);
    throw new Error("Failed to generate job fit analysis");
  }
}

// Helper function to calculate a numeric recommendation score
function calculateRecommendationScore(analysis: string): number {
  const lowercaseAnalysis = analysis.toLowerCase();

  if (
    lowercaseAnalysis.includes("strong fit") ||
    lowercaseAnalysis.includes("highly recommended")
  ) {
    return 3; // Strong recommendation
  } else if (
    lowercaseAnalysis.includes("moderate fit") ||
    lowercaseAnalysis.includes("potential")
  ) {
    return 2; // Moderate recommendation
  } else if (
    lowercaseAnalysis.includes("weak fit") ||
    lowercaseAnalysis.includes("not recommended")
  ) {
    return 1; // Weak recommendation
  }

  return 0; // Neutral or unable to determine
}
