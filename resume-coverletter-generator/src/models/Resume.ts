import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  careerObjective: { type: String }, // Career goals, key strengths

  professionalExperience: [
    {
      jobTitle: { type: String, required: true },
      companyName: { type: String, required: true },
      location: {
        city: { type: String },
        state: { type: String },
      },
      dates: {
        start: { type: Date },
        end: { type: Date },
      },
      responsibilities: { type: [String] }, // List of responsibilities or tasks
      accomplishments: { type: [String] }, // Key achievements with quantifiable results
      skillsUsed: { type: [String] }, // List of technical and soft skills
    },
  ],

  education: [
    {
      degree: { type: String, required: true }, // e.g., "Bachelors", "Masters"
      fieldOfStudy: { type: String, required: true },
      universityName: { type: String, required: true },
      graduationYear: { type: Date },
      certifications: { type: [String] }, // Optional: List of certifications
    },
  ],

  skills: {
    technical: { type: [String] }, // List of technical skills (e.g., programming languages, tools)
    soft: { type: [String] }, // List of soft skills (e.g., leadership, communication)
    industrySpecific: { type: [String] }, // Specific skills based on industry
  },

  projects: [
    {
      title: { type: String },
      description: { type: String },
      role: { type: String },
      skillsUsed: { type: [String] },
      portfolioLink: { type: String }, // Link to portfolio or GitHub repo
    },
  ],

  awards: [
    {
      title: { type: String },
      year: { type: Number },
      description: { type: String },
    },
  ],

  languages: [
    {
      language: { type: String },
      proficiency: { type: String }, // e.g., "Fluent", "Intermediate"
    },
  ],

  volunteerExperience: [
    {
      organization: { type: String },
      role: { type: String },
      dates: {
        start: { type: Date },
        end: { type: Date },
      },
      description: { type: String },
    },
  ],

  hobbiesAndInterests: { type: [String] }, // Optional: Hobbies or interests

  websites: [
    {
      platform: { type: String }, // e.g., "LinkedIn", "GitHub", "Personal Website"
      url: { type: String, required: true }, // URL of the website
    },
  ],

  jobPreferences: {
    desiredJobTitles: { type: [String] }, // Desired positions or job titles
    preferredLocation: { type: String }, // Preferred location for work
    employmentType: { type: String }, // e.g., "Full-time", "Part-time", "Contract"
    preferredIndustry: { type: [String] }, // Industries the user is interested in
  },
  resume: {
    type: String,
    required: true,
  },
});
const Resume = mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
export default Resume;
