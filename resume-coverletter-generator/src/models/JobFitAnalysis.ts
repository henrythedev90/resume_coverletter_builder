import mongoose from "mongoose";

const JobFitAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    fitScore: { type: Number, required: true },
    analysisFeedback: { type: String, required: true },
  },
  { timestamps: true }
);

const JobFitAnalysis =
  mongoose.models.JobFitAnalysis ||
  mongoose.model("JobFitAnalysis", JobFitAnalysisSchema);
export default JobFitAnalysis;
