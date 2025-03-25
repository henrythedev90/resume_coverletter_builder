import mongoose from "mongoose";

export interface CoverLetterInput {
  user: mongoose.Types.ObjectId;
  resume: mongoose.Types.ObjectId;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  companyMission: string;
  reasonForApplying: string;
  keySkills: string[];
  jobPostingPlatform: string;
}
