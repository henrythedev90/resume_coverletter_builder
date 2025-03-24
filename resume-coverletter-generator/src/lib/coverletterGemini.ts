import { GoogleGenerativeAI } from "@google/generative-ai";
import { CoverLetterInput } from "@/types/coverletter";
import CoverLetter from "@/models/CoverLetter";
import Resume from "@/models/Resume";
import User from "@/models/User";
import mongoose from "mongoose";

const genAIapiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(genAIapiKey);

export async function generateCoverLetter(coverLetterData: CoverLetterInput) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Validate input data
  const requiredFields: (keyof CoverLetterInput)[] = [
    "jobTitle",
    "companyName",
    "jobDescription",
    "companyMission",
    "reasonForApplying",
    "keySkills",
  ];

  requiredFields.forEach((field) => {
    if (!coverLetterData[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  });

  // Fetch user details
  const user = await User.findById(coverLetterData.user);
  if (!user) {
    throw new Error("User not found");
  }

  // Fetch resume details
  const resume = await Resume.findById(coverLetterData.resume);
  if (!resume) {
    throw new Error("Resume not found");
  }

  // Construct detailed resume summary
  const resumeSummary = {
    careerObjective: resume.careerObjective || "",
    professionalExperience: (resume.professionalExperience || [])
      .map(
        (exp) =>
          `${exp.jobTitle || "N/A"} at ${exp.companyName || "N/A"} (${
            exp.dates?.start
              ? new Date(exp.dates.start).toLocaleDateString()
              : "Start Date N/A"
          } - ${
            exp.dates?.end
              ? new Date(exp.dates.end).toLocaleDateString()
              : "Present"
          }): 
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
          } from ${edu.universityName || "University N/A"}, Graduated ${
            edu.graduationYear || "Year N/A"
          }`
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
    awards: (resume.awards || [])
      .map(
        (award) =>
          `${award.title || "Unnamed Award"} (${award.year || "Year N/A"}): ${
            award.description || "No description"
          }`
      )
      .join("\n"),
    volunteerExperience: (resume.volunteerExperience || [])
      .map(
        (vol) =>
          `${vol.role || "Volunteer Role"} at ${
            vol.organization || "Organization N/A"
          } (${
            vol.dates?.start
              ? new Date(vol.dates.start).toLocaleDateString()
              : "Start Date N/A"
          } - ${
            vol.dates?.end
              ? new Date(vol.dates.end).toLocaleDateString()
              : "Present"
          }): ${
            (vol.contributions || []).join(", ") || "No contributions listed"
          }`
      )
      .join("\n"),
    languages: (resume.languages || [])
      .map(
        (lang) =>
          `${lang.language || "Language N/A"} (${
            lang.proficiency || "Proficiency N/A"
          })`
      )
      .join(", "),
    jobPreferences: resume.jobPreferences
      ? `Desired Roles: ${
          (resume.jobPreferences.desiredJobTitles || []).join(", ") || "N/A"
        }
        Preferred Location: ${resume.jobPreferences.preferredLocation || "N/A"}
        Employment Type: ${resume.jobPreferences.employmentType || "N/A"}
        Preferred Industries: ${
          (resume.jobPreferences.preferredIndustry || []).join(", ") || "N/A"
        }`
      : "No job preferences specified",
    hobbiesAndInterests:
      (resume.hobbiesAndInterests || []).join(", ") ||
      "No hobbies or interests listed",
    websites: (resume.websites || [])
      .map((site) => `${site.platform || "Website"}: ${site.url || "N/A"}`)
      .join("\n"),
  };

  // Construct the prompt
  const prompt = `Generate a professional, tailored cover letter for ${
    user.firstName
  } ${user.lastName}:

Job Details:
- Job Title: ${coverLetterData.jobTitle}
- Company Name: ${coverLetterData.companyName}
- Company Mission: ${coverLetterData.companyMission}

Job Description:
${coverLetterData.jobDescription}

Candidate's Background:
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

Reason for Applying:
${coverLetterData.reasonForApplying}

Key Skills to Highlight:
${coverLetterData.keySkills.join(", ")}

Writing Guidelines:
- Craft a compelling narrative connecting the candidate's background to the job
- Highlight 2-3 most relevant experiences that directly align with job requirements
- Demonstrate understanding of the company's mission
- Maintain a professional, engaging tone
- Keep the letter concise (350-450 words)
- Write in first-person perspective
- Create a strong opening and closing paragraph

Generate a cover letter that showcases ${
    user.firstName
  }'s passion, expertise, and potential value to the company.`;

  try {
    // Generate cover letter
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const coverLetterText = response.text();

    // Save the generated cover letter to MongoDB
    const newCoverLetter = new CoverLetter({
      ...coverLetterData,
      generatedLetter: coverLetterText,
    });
    await newCoverLetter.save();

    // Update user's coverLetter array
    await User.findByIdAndUpdate(coverLetterData.user, {
      $push: { coverLetter: newCoverLetter._id },
    });

    return coverLetterText;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error("Failed to generate cover letter");
  }
}

// Example usage function
async function exampleUsage() {
  try {
    const coverLetterData: CoverLetterInput = {
      user: new mongoose.Types.ObjectId(), // Existing User ID
      resume: new mongoose.Types.ObjectId(), // Existing Resume ID
      jobTitle: "Software Engineer",
      companyName: "Tech Innovations Inc.",
      jobDescription:
        "Seeking a talented Software Engineer to join our dynamic team...",
      companyMission: "Revolutionizing technology through innovative solutions",
      reasonForApplying:
        "Passionate about creating impactful software solutions",
      keySkills: ["JavaScript", "React", "Node.js", "MongoDB"],
    };

    const generatedCoverLetter = await generateCoverLetter(coverLetterData);
    console.log(generatedCoverLetter);
  } catch (error) {
    console.error("Cover letter generation failed:", error);
  }
}

export default generateCoverLetter;
