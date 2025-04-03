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
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "Use the GET method",
    });
  }

  try {
    const { id: resumeId } = req.query; // Get the resumeId from the query parameters.

    if (!resumeId || typeof resumeId !== "string") {
      return res.status(400).json({
        error: "Bad Request",
        message: "Resume ID is required.",
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

    await connectDB();

    const resume = await Resume.findOne({
      _id: new mongoose.Types.ObjectId(resumeId),
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!resume) {
      return res.status(404).json({
        error: "Not Found",
        message: "Resume not found.",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
