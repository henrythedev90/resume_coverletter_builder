import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { analyzeJobFit } from "@/lib/jobFitGemini";
import { DecodedToken } from "@/types/decodedToken";
import Resume from "@/models/Resume";
import JobFitAnalysis from "@/models/JobFitAnalysis";
import connectDB from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { resumeId, jobTitle, jobDescription, companyName } = req.body;

      if (!resumeId || !jobTitle || !jobDescription || !companyName) {
        return res.status(400).json({
          error: "Missing required fileds",
        });
      }

      await connectDB();

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

      let resumeObjId = resumeId.toString();
      const resumeInfo = await Resume.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        _id: new mongoose.Types.ObjectId(resumeObjId as string),
      });

      if (!resumeInfo) {
        return res.status(405).json({
          error: "Resume cannot be found",
          message: "The resume you are looking for does not being to the user",
        });
      }
      const result = await analyzeJobFit({
        resumeId,
        jobTitle,
        jobDescription,
        companyName,
      });

      const jobFitResult = {
        resumeId,
        jobTitle,
        jobDescription,
      };

      const newJobFitAnalysis = new JobFitAnalysis({
        userId: new mongoose.Types.ObjectId(userId),
        fitScore: result.recommendationScore,
        analysisFeedback: result.analysis,
        companyName: result.companyName,
        ...jobFitResult,
      });

      await newJobFitAnalysis.save();
      return res.status(200).json({ body: result, success: true });
    } catch (error) {
      console.error("Job Fit Analysis API Error:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
