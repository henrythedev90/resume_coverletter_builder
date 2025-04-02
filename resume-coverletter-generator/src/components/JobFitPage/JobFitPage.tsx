"use client";
import React, { useState, useEffect } from "react";
import { Types } from "mongoose";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocument from "@/components/Resume/ResumeDocument/ResumeDocument";
import { Button } from "@/components/ui/button";
import { CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";
import { User } from "@/types/user";

interface AnalysisResult {
  recommendationScore: number;
  analysis: string;
}

const JobFitPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyMission, setCompanyMission] = useState("");
  const [resumeData, setResumeData] = useState<CreateResumeInput | null>(null);

  const resumeId = searchParams ? searchParams.get("resumeId") : null;

  console.log(session, "this is session");
  // Check authentication status
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch resume data when component mounts
  useEffect(() => {
    const fetchResumeData = async () => {
      if (!resumeId || !session) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Authentication token not found");
          router.push("/login");
          return;
        }

        const response = await axios.get(`/api/resumes/${resumeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setResumeData(response.data.body);

          // Verify that the resume belongs to the current user
          if (
            session.user &&
            response.data.body.userId.toString() !== session.user._id
          ) {
            setError("You don't have permission to access this resume.");
            router.push("/dashboard");
          }
        } else {
          setError("Failed to fetch resume data.");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch resume data.");
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId, router, session]);

  const handlePrint = () => {
    window.print();
  };

  const handleChange = (name: string, value: string) => {
    switch (name) {
      case "jobTitle":
        setJobTitle(value);
        break;
      case "jobDescription":
        setJobDescription(value);
        break;
      case "companyName":
        setCompanyName(value);
        break;
      case "companyMission":
        setCompanyMission(value);
        break;
      default:
        break;
    }
  };

  const handleJobFitAnalysis = async () => {
    if (!jobTitle || !jobDescription) {
      setError("Job title and description are required.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Authentication token not found");
        alert("You need to log in again. Redirecting to login page...");
        router.push("/login");
        return;
      }

      const response = await axios.post(
        "/api/job-fit/analyze",
        {
          resumeId,
          jobTitle,
          jobDescription,
          companyName,
          companyMission,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAnalysisResult(response.data.body);
      } else {
        setError(response.data.error || "Failed to analyze job fit.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to analyze job fit.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisResult = () => {
    if (!analysisResult) return null;

    return (
      <div className="mt-8 p-6 border rounded-lg bg-card">
        <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Recommendation Score</h3>
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  analysisResult.recommendationScore === 3
                    ? "bg-green-500"
                    : analysisResult.recommendationScore === 2
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${analysisResult.recommendationScore}%` }}
              ></div>
            </div>
            <span className="ml-4 font-bold">
              {analysisResult.recommendationScore}%
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Detailed Analysis</h3>
          <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">
            {analysisResult.analysis}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Job Fit Analysis</h1>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Job Title"
            name="jobTitle"
            value={jobTitle}
            onChange={handleChange}
          />
          <FormField
            label="Company Name"
            name="companyName"
            value={companyName}
            onChange={handleChange}
          />
        </div>

        <FormField
          label="Job Description"
          name="jobDescription"
          value={jobDescription}
          onChange={handleChange}
          type="textarea"
        />

        <FormField
          label="Company Mission"
          name="companyMission"
          value={companyMission}
          onChange={handleChange}
          type="textarea"
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {renderAnalysisResult()}

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button
            onClick={handleJobFitAnalysis}
            disabled={loading || !resumeId}
            className="bg-primary hover:bg-primary-dark"
          >
            {loading ? "Analyzing..." : "Analyze Job Fit"}
          </Button>

          {resumeData && session?.user && (
            <>
              <PDFDownloadLink
                document={
                  <ResumeDocument
                    resumeData={resumeData}
                    user={session.user as unknown as User}
                  />
                }
                fileName={`${session.user.name || "resume"}.pdf`}
                className="no-underline"
              >
                {({ blob, url, loading, error }) => (
                  <Button disabled={loading} variant="outline">
                    {loading ? "Preparing PDF..." : "Download Resume"}
                  </Button>
                )}
              </PDFDownloadLink>

              <Button onClick={handlePrint} variant="outline">
                Print Resume
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFitPage;
