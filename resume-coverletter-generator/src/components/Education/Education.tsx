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
    graduationYear: undefined,
    certifications: [],
  });

  const handleCurrentEducationChange = (
    name: string | keyof Education,
    value: any
  ) => {
    setCurrentEducation((prev) => ({
      ...prev,
      [name as keyof Education]: value,
    }));
  };

  const handleAddEducation = () => {
    if (
      currentEducation.universityName &&
      currentEducation.fieldOfStudy &&
      currentEducation.degree
    ) {
      setFormData((prev) => ({
        ...prev,
        education: [...prev.education, currentEducation],
      }));
      setCurrentEducation({
        degree: "",
        fieldOfStudy: "",
        universityName: "",
        graduationYear: undefined,
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
        <FormField
          label="Graduation Year"
          name="graduationYear"
          type="number" // Only this line was changed
          placeholder="Graduation Year"
          value={currentEducation.graduationYear}
          onChange={(name, value) => handleCurrentEducationChange(name, value)}
        />

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

      {formData.education && formData.education.length > 0 && (
        <div className="space-y-4 mt-6">
          {formData.education && formData.education.length > 0 && (
            <div className="space-y-4 mt-6">
              {formData.education
                .filter(
                  (education) =>
                    education &&
                    education.universityName &&
                    education.fieldOfStudy &&
                    education.degree
                )
                .map((education, index) => (
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

                    <p>
                      <strong>Graduation Year:</strong>{" "}
                      {education.graduationYear}
                    </p>

                    {education.certifications &&
                      education.certifications.length > 0 && (
                        <p>
                          <strong>Certifications:</strong>{" "}
                          {education.certifications.join(", ")}
                        </p>
                      )}
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
      )}
    </div>
  );
};

export default EducationComponent;
