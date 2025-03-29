"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Education, CreateResumeInput } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";
import DatePicker from "../ui/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";

interface EducationComponentProps {
  formData: CreateResumeInput;
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>;
}

const EducationComponent: React.FC<EducationComponentProps> = ({
  formData,
  setFormData,
}) => {
  const [currentEducation, setCurrentEducation] = useState<Education>({
    degree: "",
    fieldOfStudy: "",
    universityName: "",
    graduationYear: { start: undefined, end: undefined },
    certifications: [],
  });

  const handleEducationChange = (key: keyof Education, value: any) => {
    setCurrentEducation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateChange = (key: "start" | "end", value: Date | undefined) => {
    setCurrentEducation((prev) => ({
      ...prev,
      graduationYear: {
        ...prev.graduationYear,
        [key]: value,
      },
    }));
  };

  const handleAddEducation = () => {
    const updatedEducations = [...(formData.education || []), currentEducation];
    setFormData((prev) => ({
      ...prev,
      education: updatedEducations,
    }));
    setCurrentEducation({
      degree: "",
      fieldOfStudy: "",
      universityName: "",
      graduationYear: { start: undefined, end: undefined },
      certifications: [],
    });
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducations = [...(formData.education || [])];
    updatedEducations.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      education: updatedEducations,
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Education</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>School Name</Label>
          <Input
            placeholder="School Name"
            value={currentEducation.universityName}
            onChange={(e) =>
              handleEducationChange("universityName", e.target.value)
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Field of Study</Label>
          <Input
            placeholder="Field of Study"
            value={currentEducation.fieldOfStudy}
            onChange={(e) =>
              handleEducationChange("fieldOfStudy", e.target.value)
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Degree</Label>
          <Input
            placeholder="Degree"
            value={currentEducation.degree}
            onChange={(e) => handleEducationChange("degree", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Date Range</Label>
          <DatePicker
            date={currentEducation.graduationYear?.start}
            setDate={(date) => handleDateChange("start", date)}
            placeholder="Start Date"
          />
          <DatePicker
            date={currentEducation.graduationYear?.end}
            setDate={(date) => handleDateChange("end", date)}
            placeholder="End Date"
          />
        </div>
        <div>
          <StringArrayInput
            label="Certifications"
            items={currentEducation.certifications || []}
            setItems={(items) => handleEducationChange("certifications", items)}
          />
        </div>
      </div>
      <Button onClick={handleAddEducation} className="mt-2">
        Add Education
      </Button>
      {formData.education &&
        formData.education.length > 0 &&
        formData.education.map((education, index) => (
          <div
            key={`education-${index}`}
            className="space-y-2 border p-4 rounded"
          >
            <p>
              <strong>School Name:</strong> {education.universityName}
            </p>
            <p>
              <strong>Field of Study:</strong> {education.fieldOfStudy}
            </p>
            <p>
              <strong>Degree:</strong> {education.degree}
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveEducation(index)}
            >
              Remove Education
            </Button>
          </div>
        ))}
    </div>
  );
};

export default EducationComponent;
