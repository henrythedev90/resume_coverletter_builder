"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface JobFitAnalysisResult {
  recommendationScore: number;
  analysis: string;
  // Add other properties based on your API response
}

const JobFitResultPage = () => {
  const params = useParams();
  const [analysisResult, setAnalysisResult] =
    useState<JobFitAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobFitResult = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/job-fit/${params?.id}` // Replace with your API endpoint
        );
        setAnalysisResult(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch job fit result.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobFitResult();
  }, [params?.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!analysisResult) {
    return <p>Job fit result not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">Job Fit Analysis Result</h1>
      <p>Recommendation Score: {analysisResult.recommendationScore}</p>
      <pre>{analysisResult.analysis}</pre>
      <Button onClick={() => window.print()}>Print</Button>
    </div>
  );
};

export default JobFitResultPage;
