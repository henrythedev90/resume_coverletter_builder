"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Education, CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";
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

  const handleCurrentEducationChange = (
    name: string | keyof Education,
    value: any
  ) => {
    if (name === "start" || name === "end") {
      setCurrentEducation((prev) => ({
        ...prev,
        graduationYear: {
          ...prev.graduationYear,
          [name]: value as Date | undefined,
        },
      }));
    } else {
      setCurrentEducation((prev) => ({
        ...prev,
        [name as keyof Education]: value,
      }));
    }
  };

  const handleAddEducation = () => {
    if (
      currentEducation.universityName &&
      currentEducation.fieldOfStudy &&
      currentEducation.degree
    ) {
      const updatedEducations = [
        ...(formData.education || []),
        currentEducation,
      ];
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
    }
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
        <FormField
          label="School Name"
          name="universityName"
          placeholder="School Name"
          value={currentEducation.universityName}
          onChange={(name, value) => handleCurrentEducationChange(name, value)}
        />
        <FormField
          label="Field of Study"
          name="fieldOfStudy"
          placeholder="Field of Study"
          value={currentEducation.fieldOfStudy}
          onChange={(name, value) => handleCurrentEducationChange(name, value)}
        />
        <FormField
          label="Degree"
          name="degree"
          placeholder="Degree"
          value={currentEducation.degree}
          onChange={(name, value) => handleCurrentEducationChange(name, value)}
        />
        <div className="space-y-2">
          <label>Start</label>
          <DatePicker
            date={currentEducation.graduationYear?.start}
            setDate={(date) => handleCurrentEducationChange("start", date)}
            placeholder="Start Date"
          />
          <label>End</label>
          <DatePicker
            date={currentEducation.graduationYear?.end}
            setDate={(date) => handleCurrentEducationChange("end", date)}
            placeholder="End Date"
          />
        </div>
        <div>
          <StringArrayInput
            label="Certifications"
            items={currentEducation.certifications || []}
            setItems={(items) =>
              handleCurrentEducationChange("certifications", items)
            }
          />
        </div>
      </div>
      <Button
        onClick={handleAddEducation}
        disabled={
          !currentEducation.universityName ||
          !currentEducation.fieldOfStudy ||
          !currentEducation.degree
        }
        className="mt-2"
      >
        Add Education
      </Button>

      {formData.education &&
        formData.education.length > 0 &&
        formData.education.some(
          (education) =>
            education &&
            education.universityName &&
            education.fieldOfStudy &&
            education.degree
        ) && (
          <div>
            {formData.education.map((education, index) => (
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
        )}
    </div>
  );
};

export default EducationComponent;
