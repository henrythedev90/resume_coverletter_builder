import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Resume from "@/models/Resume";
import CoverLetter from "@/models/CoverLetter";
import connectDB from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { generateCoverLetter } from "@/lib/coverletterGemini";
import { DecodedToken } from "@/types/decodedToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "Use the Post method",
    });
  }

  try {
    await connectDB();
    const {
      jobTitle,
      companyName,
      jobDescription,
      companyMission,
      reasonForApplying,
      keySkills,
      jobPostingPlatform,
      personalTrait,
      achievements,
      relevantSkills,
      careerGoals,
      avaliability,
    } = req.body;

    if (
      !jobTitle ||
      !companyName ||
      !jobDescription ||
      !companyMission ||
      !reasonForApplying ||
      !jobPostingPlatform
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "All fields are required.",
      });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }

    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
    const userId = decoded.userId;

    if (!userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const resume = await Resume.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!resume) {
      return res.status(404).json({
        error: "Resume Not Found",
        message: "No resume found for this user",
      });
    }

    const coverLetterData = {
      jobTitle,
      companyName,
      jobDescription,
      companyMission,
      reasonForApplying,
      jobPostingPlatform,
      userId: new mongoose.Types.ObjectId(userId),
      resumeId: new mongoose.Types.ObjectId(resume._id as string),
      ...(personalTrait && { personalTrait }),
      ...(achievements && { achievements }),
      ...(relevantSkills && { relevantSkills }),
      ...(careerGoals && { careerGoals }),
      ...(avaliability && { avaliability }),
      ...(keySkills && { keySkills }),
    };

    const generatedCoverLetter = await generateCoverLetter(coverLetterData);

    const coverLetter = new CoverLetter({
      resume: resume._id,
      coverLetter: generatedCoverLetter.coverLetter,
      ...coverLetterData,
    });

    await coverLetter.save();

    if (generatedCoverLetter.success) {
      return res.status(200).json(generatedCoverLetter);
    } else {
      return res.status(500).json(generatedCoverLetter);
    }
  } catch (error) {
    console.error("Cover-Letter generation error:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
