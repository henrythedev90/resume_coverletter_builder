import mongoose from "mongoose";

export interface CoverLetterInput {
  userId: mongoose.Types.ObjectId;
  resumeId: mongoose.Types.ObjectId;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  companyMission: string;
  reasonForApplying: string;
  keySkills: string[];
  jobPostingPlatform: string;
  personalTrait?: string;
  achievements?: string;
  relevantSkills?: string;
  careerGoals?: string;
  avaliability?: string;
}
