import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import JobFitAnalysis from "@/models/JobFitAnalysis";
import connectDB from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Missing job fit analysis ID" });
      }

      await connectDB();

      const analysis = await JobFitAnalysis.findById({
        _id: new mongoose.Types.ObjectId(id as string),
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
