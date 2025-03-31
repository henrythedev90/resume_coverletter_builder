"use client";
import React, { useState } from "react";
import { Types } from "mongoose";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocument from "@/components/Resume/ResumeDocument/ResumeDocument";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";

interface AnalysisResult {
  recommendationScore: number;
  analysis: string;
}

const defaultResumeData: CreateResumeInput = {
  userId: new Types.ObjectId(),
  careerObjective: "",
  professionalExperience: [],
  education: [],
  skills: { technical: [], soft: [], industrySpecific: [] },
  projects: [],
  awards: [],
  languages: [],
  volunteerExperience: [],
  websites: [],
  hobbiesAndInterests: [],
  jobPreferences: {
    desiredJobTitles: [],
    preferredIndustry: [],
    preferredLocation: "",
    employmentType: "",
  },
};

const JobFitPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
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

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">Job Fit Analysis</h1>

      <FormField
        label="Job Title"
        name="jobTitle"
        value={jobTitle}
        onChange={handleChange}
      />
      <FormField
        label="Job Description"
        name="jobDescription"
        value={jobDescription}
        onChange={handleChange}
      />
      <FormField
        label="Company Name"
        name="companyName"
        value={companyName}
        onChange={handleChange}
      />
      <FormField
        label="Company Mission"
        name="companyMission"
        value={companyMission}
        onChange={handleChange}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {analysisResult && (
        <div>
          <p>Recommendation Score: {analysisResult.recommendationScore}</p>
          <pre>{analysisResult.analysis}</pre>
        </div>
      )}
      <div className="flex justify-center space-x-4">
        <PDFDownloadLink
          document={
            <ResumeDocument resumeData={resumeData || defaultResumeData} />
          }
          fileName="resume.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : <Button>Download Resume</Button>
          }
        </PDFDownloadLink>
        <Button onClick={handlePrint}>Print Resume</Button>
        <Button onClick={handleJobFitAnalysis}>Job Fit Analysis</Button>
      </div>
    </div>
  );
};

export default JobFitPage;
