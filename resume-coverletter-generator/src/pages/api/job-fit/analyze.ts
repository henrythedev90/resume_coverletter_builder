import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { analyzeJobFit } from "@/lib/jobFitGemini";
import { DecodedToken } from "@/types/decodedToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { resumeId, jobTitle, jobDescription } = req.body;

      if (!resumeId || !jobTitle || !jobDescription) {
        return res.status(400).json({
          error: "Missing required fileds",
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

      const result = await analyzeJobFit({
        resumeId,
        jobTitle,
        jobDescription,
      });

      res.status(200).json(result);
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
