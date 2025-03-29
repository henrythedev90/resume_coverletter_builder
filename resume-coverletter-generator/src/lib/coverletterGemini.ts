import { GoogleGenerativeAI } from "@google/generative-ai";
import { CoverLetterInput } from "../types/coverletter";
import { coverLetterTemplate } from "../types/coverLetterTemplate";
import {
  ProfessionalExperience,
  Education,
  Project,
  Award,
  Language,
  VolunteerExperience,
  Website,
} from "@/types/resume";
import Resume from "@/models/Resume";
import User from "@/models/User";

export async function generateCoverLetter(coverLetterData: CoverLetterInput) {
  const genAIapiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
  const genAI = new GoogleGenerativeAI(genAIapiKey);
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

  // Fetch resume details
  const resume = await Resume.findById(coverLetterData.resumeId);
  if (!resume) {
    throw new Error("Resume not found");
  }

  const userInfo = await User.findById(resume.userId);

  if (!userInfo) {
    throw new Error("User not found");
  }

  let userName = `${userInfo.firstName
    .charAt(0)
    .toUpperCase()}${userInfo.firstName.slice(1)} ${userInfo.lastName
    .charAt(0)
    .toUpperCase()}${userInfo.lastName.slice(1)}`;

  const resumeSummary = {
    careerObjective: resume.careerObjective || "",
    professionalExperience: (resume.professionalExperience || [])
      .map(
        (exp: ProfessionalExperience) =>
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
        (edu: Education) =>
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
        (proj: Project) =>
          `${proj.title || "Untitled Project"}: ${
            proj.description || "No description"
          } (Skills: ${
            (proj.skillsUsed || []).join(", ") || "No skills specified"
          })`
      )
      .join("\n"),
    awards: (resume.awards || [])
      .map(
        (award: Award) =>
          `${award.title || "Unnamed Award"} (${award.year || "Year N/A"}): ${
            award.description || "No description"
          }`
      )
      .join("\n"),
    volunteerExperience: (resume.volunteerExperience || [])
      .map(
        (vol: VolunteerExperience) =>
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
          })`
      )
      .join("\n"),
    languages: (resume.languages || [])
      .map(
        (lang: Language) =>
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
      .map(
        (site: Website) => `${site.platform || "Website"}: ${site.url || "N/A"}`
      )
      .join("\n"),
  };

  const prompt = `Generate a professional, tailored cover letter for ${userName}:

  Template: ${coverLetterTemplate}
  
  Job Details:
  - Job Title: ${coverLetterData.jobTitle}
  - Company Name: ${coverLetterData.companyName}
  - Company Mission: ${coverLetterData.companyMission}
  
  Candidate's Personal Profile:
  - Personal Trait: ${coverLetterData.personalTrait || "Not specified"}
  - Key Achievements: ${
    coverLetterData.achievements || "No specific achievements noted"
  }
  - Relevant Skills: ${
    coverLetterData.relevantSkills ||
    resumeSummary.skills.technical + ", " + resumeSummary.skills.soft
  }
  - Career Goals: ${
    coverLetterData.careerGoals || resumeSummary.careerObjective
  }
  - Availability: ${coverLetterData.avaliability || "Not specified"}
  
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
  
  Saw job posting at ${coverLetterData.jobPostingPlatform}
  
  Writing Guidelines:
  - Craft a compelling narrative connecting the candidate's background to the job
  - Highlight 2-3 most relevant experiences that directly align with job requirements
  - Demonstrate understanding of the company's mission
  - Incorporate personal traits and career goals into the narrative
  - Emphasize key achievements and their relevance to the role
  - Discuss availability and readiness to contribute
  - Maintain a professional, engaging tone
  - Keep the letter concise (350-450 words)
  - Write in first-person perspective
  - Create a strong opening and closing paragraph
  - Omit Address and Phone number
  - User's full name is ${userName}
  - User's email is ${userInfo.email}
  
  Generate a cover letter that showcases ${userName}'s passion, expertise, personal traits, and potential value to the company.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const coverLetterText = response.text();

    return {
      success: true,
      coverLetter: coverLetterText,
      candidateName: userName,
    };
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error("Failed to generate cover letter");
  }
}
