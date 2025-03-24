import { GoogleGenerativeAI } from "@google/generative-ai";
const genAIapiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(genAIapiKey);

import {
  ProfessionalExperience,
  Education,
  Project,
  Award,
  Language,
  VolunteerExperience,
  ResumeType,
} from "@/types/resume";

export async function generateResume(
  resume: ResumeType & { userName?: string; userEmail?: string }
) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Helper function to safely join array items or return "N/A"
  const safeJoin = (arr?: string[] | null) => arr?.join(", ") || "N/A";

  const prompt = `
    You are a professional resume writer. Generate a well-structured, professional resume based on the following details:

    Candidate Information:
    ${resume.userName ? `Name: ${resume.userName}` : ""}
    ${resume.userEmail ? `Email: ${resume.userEmail}` : ""}

    Career Objective: ${resume.careerObjective}

    Professional Experience:
    ${
      resume.professionalExperience?.length
        ? resume.professionalExperience
            .map(
              (exp: ProfessionalExperience) => `
    • ${exp.jobTitle} at ${exp.companyName}
      - Responsibilities: ${safeJoin(exp.responsibilities)}
      - Key Accomplishments: ${safeJoin(exp.accomplishments)}
    `
            )
            .join("\n")
        : "N/A"
    }

    Education:
    ${
      resume.education?.length
        ? resume.education
            .map(
              (edu: Education) => `
    • ${edu.degree} in ${edu.fieldOfStudy}
      - ${edu.universityName}, Graduated ${edu.graduationYear}
    `
            )
            .join("\n")
        : "N/A"
    }

    Skills:
    Technical Skills: ${safeJoin(resume.skills?.technical)}
    Soft Skills: ${safeJoin(resume.skills?.soft)}
    Industry-Specific Skills: ${safeJoin(resume.skills?.industrySpecific)}

    Projects:
    ${
      resume.projects?.length
        ? resume.projects
            .map(
              (proj: Project) => `
    • ${proj.title}
      - Description: ${proj.description}
      - Role: ${proj.role}
      - Skills Used: ${safeJoin(proj.skillsUsed)}
    `
            )
            .join("\n")
        : "N/A"
    }

    Awards:
    ${
      resume.awards?.length
        ? resume.awards
            .map(
              (award: Award) => `
    • ${award.title} (${award.year})
    `
            )
            .join("\n")
        : "N/A"
    }

    Languages:
    ${
      resume.languages?.length
        ? resume.languages
            .map(
              (lang: Language) => `
    • ${lang.language}: ${lang.proficiency}
    `
            )
            .join("\n")
        : "N/A"
    }

    Volunteer Experience:
    ${
      resume.volunteerExperience?.length
        ? resume.volunteerExperience
            .map(
              (vol: VolunteerExperience) => `
    • ${vol.role} at ${vol.organization}
      - Contributions: ${safeJoin(vol.contributions)}
    `
            )
            .join("\n")
        : "N/A"
    }

    Hobbies and Interests: ${safeJoin(resume.hobbiesAndInterests)}

    Job Preferences:
    • Desired Job Titles: ${safeJoin(resume.jobPreferences?.desiredJobTitles)}
    • Preferred Location: ${resume.jobPreferences?.preferredLocation || "N/A"}
    • Employment Type: ${resume.jobPreferences?.employmentType || "N/A"}
    • Preferred Industry: ${safeJoin(resume.jobPreferences?.preferredIndustry)}

    Please generate a professional, concise resume that highlights the candidate's strengths and achievements.
  `;

  try {
    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const generatedResume = response.text();

    return {
      success: true,
      resume: generatedResume,
      candidateName: resume.userName,
      candidateEmail: resume.userEmail,
    };
  } catch (error) {
    console.error("Resume Generation Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
