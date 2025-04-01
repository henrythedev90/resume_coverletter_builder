import mongoose from "mongoose";

// Define the CoverLetter Schema
const CoverLetterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    jobFitAnalysisId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobFitAnalysis",
      requred: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String, // Or you can use a reference to a Job model if needed
      required: true,
    },
    companyMission: {
      type: String,
      required: true,
    },
    reasonForApplying: {
      type: String, // Why the user wants the role or company
      required: true,
    },
    keySkills: {
      type: [String], // A list of key skills that the user wants to highlight
      required: false,
    },
    personalTraits: {
      type: [String], // Personal attributes the user wants to mention
    },
    achievements: {
      type: [String], // Achievements that align with the job (optional, but helpful)
    },
    relevantExperience: {
      type: [String], // Specific experience or projects that tie to the job
    },
    careerGoals: {
      type: String, // A short description of the user's career goals
    },
    availability: {
      type: String, // Availability for interviews or starting the job
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    jobPostingPlatform: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create the CoverLetter model
const CoverLetter =
  mongoose.models.CoverLetter ||
  mongoose.model("CoverLetter", CoverLetterSchema);
export default CoverLetter;
