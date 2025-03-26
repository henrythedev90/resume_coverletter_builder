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
  // Only allow DELETE method
  if (req.method !== "DELETE") {
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "Use the DELETE method",
    });
  }

  try {
    // Extract id from query parameters
    const { id } = req.query;
    console.log(id, "this is resume Id");
    // Validate id is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Resume ID is required",
      });
    }

    // Check for authorization token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Extract and verify JWT token
    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }

    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
    const userId = decoded.userId;

    // Connect to database
    await connectDB();

    // Find and delete the resume, ensuring it belongs to the authenticated user
    const result = await Resume.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id as string),
      userId: new mongoose.Types.ObjectId(userId),
    });

    // Check if resume was found and deleted
    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Resume not found or you do not have permission to delete it",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Resume deletion error:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
