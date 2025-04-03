"use client";
import React, { useState, useEffect } from "react";
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

interface Resume {
  _id: string;
  title: string;
  createdAt: string;
}

const JobFitPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const resumeIdFromQuery = searchParams?.get("resumeId") ?? null;
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
  const [userData, setUserData] = useState<User | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [generatingResume, setGeneratingResume] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(
    resumeIdFromQuery
  );

  useEffect(() => {
    if (!session?.user?._id) return;

    const fetchResumesAndUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Authentication token not found");
          router.push("/login");
          return;
        }

        const resumesResponse = await axios.get(
          `/api/resume/user/${session.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (resumesResponse.data.success) {
          const resumesData = resumesResponse.data.resumes || [];
          setResumes(resumesData);
        } else {
          setError("Failed to fetch user resumes.");
        }

        const userDataResponse = await axios.get(`/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userDataResponse.data.success) {
          debugger;
          setUserData(userDataResponse.data.data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch resumes or user data.");
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResumesAndUserData();
  }, [session, router]);

  useEffect(() => {
    if (selectedResumeId) {
      const fetchSelectedResumeData = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("authToken");
          if (!token) {
            console.error("Authentication token not found");
            router.push("/login");
            return;
          }
          debugger;
          const response = await axios.get(`/api/resume/${selectedResumeId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            debugger;
            setResumeData(response.data.resume);
          } else {
            setError("Failed to fetch selected resume data.");
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message || "Failed to fetch selected resume data.");
          } else {
            setError("An unknown error occurred.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchSelectedResumeData();
    }
  }, [selectedResumeId, router]);

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

    if (!selectedResumeId) {
      setError("Please select a resume first.");
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
          resumeId: selectedResumeId,
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
                style={{
                  width: `${
                    analysisResult.recommendationScore === 3
                      ? "100%"
                      : analysisResult.recommendationScore === 2
                      ? "66.66%"
                      : "33.33%"
                  }`,
                }}
              ></div>
            </div>
            <span className="ml-4 font-bold">
              {analysisResult.recommendationScore} / 3
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

  console.log("resumeIdFromQuery:", resumeIdFromQuery);
  console.log("resumeData:", resumeData);
  console.log("userData:", userData);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Job Fit Analysis</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {resumeIdFromQuery ? "Generated Resume" : "Select Resume"}
        </h2>

        {resumeIdFromQuery && resumeData && userData ? (
          <div className="flex flex-wrap gap-3">
            <PDFDownloadLink
              document={
                <ResumeDocument resumeData={resumeData} user={userData} />
              }
              fileName={`${userData.firstName || "resume"}_${
                userData.lastName || ""
              }_resume.pdf`}
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
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {Array.isArray(resumes) && resumes.length > 0 ? (
              resumes.map((resume) => (
                <Button
                  key={resume._id}
                  onClick={() => setSelectedResumeId(resume._id)}
                  variant={
                    selectedResumeId === resume._id ? "default" : "outline"
                  }
                  className="flex-grow sm:flex-grow-0"
                >
                  {resume.title ||
                    `Resume (${new Date(
                      resume.createdAt
                    ).toLocaleDateString()})`}
                </Button>
              ))
            ) : (
              <p className="text-gray-600">
                No resumes found. Generate one below.
              </p>
            )}
          </div>
        )}
      </div>

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

        {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {renderAnalysisResult()}

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleJobFitAnalysis}
            disabled={loading || !selectedResumeId}
            className="bg-primary hover:bg-primary-dark"
          >
            {loading ? "Analyzing..." : "Analyze Job Fit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobFitPage;
