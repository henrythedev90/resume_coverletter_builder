import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import CoverLetter from "@/models/CoverLetter";
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
    // Extract coverLetterId from query parameters
    const { coverLetterId } = req.query;

    // Validate coverLetterId is provided
    if (!coverLetterId) {
      return res.status(400).json({
        success: false,
        error: "Cover Letter ID is required",
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

    // Find and delete the cover letter, ensuring it belongs to the authenticated user
    const result = await CoverLetter.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(coverLetterId as string),
      userId: new mongoose.Types.ObjectId(userId),
    });

    // Check if cover letter was found and deleted
    if (!result) {
      return res.status(404).json({
        success: false,
        error:
          "Cover Letter not found or you do not have permission to delete it",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Cover Letter deleted successfully",
    });
  } catch (error) {
    console.error("Cover Letter deletion error:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
