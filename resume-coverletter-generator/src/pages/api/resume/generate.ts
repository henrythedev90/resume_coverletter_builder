import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Resume from "@/models/Resume";
import connectDB from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { generateResume } from "../../../lib/resumeGemini";
import { DecodedToken } from "@/types/decodedToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "Use the POST method",
    });
  }

  try {
    const {
      careerObjective,
      professionalExperience,
      education,
      skills,
      projects,
      awards,
      languages,
      volunteerExperience,
      hobbiesAndInterests,
      jobPreferences,
      websites,
    } = req.body;

    if (
      !careerObjective ||
      !professionalExperience ||
      !education ||
      !skills ||
      !projects
    ) {
      return res.status(400).json({ error: "Missing required fields" });
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

    await connectDB();

    const resumeData = {
      careerObjective,
      professionalExperience,
      education,
      skills,
      ...(projects && { projects }),
      ...(awards && { awards }),
      ...(languages && { languages }),
      ...(volunteerExperience && { volunteerExperience }),
      ...(hobbiesAndInterests && { hobbiesAndInterests }),
      ...(websites && { websites }),
      ...(jobPreferences && { jobPreferences }),
    };

    const result = await generateResume({
      userId: new mongoose.Types.ObjectId(userId),
      ...resumeData,
    });

    // const resumeId = new mongoose.Types.ObjectId();

    const resume = new Resume({
      userId: new mongoose.Types.ObjectId(userId),
      resume: result.resume,
      ...resumeData,
    });

    await resume.save();

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    console.error("Resume generation error:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
