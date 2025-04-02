import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import ResumeDocument from "./ResumeDocument";
import { CreateResumeInput } from "@/types/resume";
import { User } from "@/types/user";

function ResumePreview({
  resumeData,
  user,
}: {
  resumeData: CreateResumeInput;
  user: User;
}) {
  if (!resumeData) {
    return <p>No resume data to preview.</p>;
  }
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <ResumeDocument resumeData={resumeData} user={user} />
      </PDFViewer>
    </div>
  );
}

export default ResumePreview;
