import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resume" }],
    coverLetter: [{ type: mongoose.Schema.Types.ObjectId, ref: "CoverLetter" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
