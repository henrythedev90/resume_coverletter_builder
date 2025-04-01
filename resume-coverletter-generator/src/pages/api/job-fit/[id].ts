import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { DecodedToken } from "@/types/decodedToken";
import jwt from "jsonwebtoken";
import JobFitAnalysis from "@/models/JobFitAnalysis";
import connectDB from "@/utils/db";

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

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT secret is not defined");
      }

      const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
      const userId = decoded.userId;

      if (!userId) {
        return res.status(400).json({
          error: "Missing required fields",
        });
      }

      console.log(id, "this is id");
      if (!id) {
        return res.status(400).json({ error: "Missing job fit analysis ID" });
      }

      await connectDB();

      const analysis = await JobFitAnalysis.findOne({
        userId: new mongoose.Types.ObjectId(userId as string),
        resumeId: new mongoose.Types.ObjectId(id as string),
      });

      if (!analysis) {
        return res.status(404).json({ error: "Job fit analysis not found" });
      }

      return res.status(200).json(analysis);
    } catch (error) {
      console.error("Job Fit Analysis API Error:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
