import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Resume from "@/models/Resume";
import connectDB from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { DecodedToken } from "@/types/decodedToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  try {
    await connectDB();

    const resumes = await Resume.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!resumes || resumes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No resumes found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
