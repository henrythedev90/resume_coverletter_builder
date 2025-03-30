"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ProfessionalExperience, CreateResumeInput } from "@/types/resume";
import DatePicker from "../ui/DatePicker/DatePicker";
import { FormField } from "@/components/ui/FormField";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";
import { Button } from "@/components/ui/button";

interface ProfessionalExperienceComponentProps {
  formData: CreateResumeInput;
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>;
}

const ProfessionalExperienceComponent: React.FC<
  ProfessionalExperienceComponentProps
> = ({ formData, setFormData }) => {
  const [currentExperience, setCurrentExperience] =
    useState<ProfessionalExperience>({
      companyName: "",
      jobTitle: "",
      location: { city: "", state: "" },
      dates: { start: new Date(), end: new Date() },
      responsibilities: [],
      accomplishments: [],
      skillsUsed: [],
    });

  const handleCurrentExperienceChange = (
    name: string | keyof ProfessionalExperience,
    value: any
  ) => {
    if (name === "city" || name === "state") {
      setCurrentExperience((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value as string },
      }));
    } else if (name === "start" || name === "end") {
      setCurrentExperience((prev) => ({
        ...prev,
        dates: { ...prev.dates, [name]: value as Date | undefined },
      }));
    } else {
      setCurrentExperience((prev) => ({
        ...prev,
        [name as keyof ProfessionalExperience]: value,
      }));
    }
  };

  const handleAddExperience = () => {
    if (currentExperience.companyName && currentExperience.jobTitle) {
      const updatedExperiences = [
        ...(formData.professionalExperience || []),
        currentExperience,
      ];
      setFormData((prev) => ({
        ...prev,
        professionalExperience: updatedExperiences,
      }));
      setCurrentExperience({
        companyName: "",
        jobTitle: "",
        location: { city: "", state: "" },
        dates: { start: new Date(), end: new Date() },
        responsibilities: [],
        accomplishments: [],
        skillsUsed: [],
      });
    }
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperiences = [...(formData.professionalExperience || [])];
    updatedExperiences.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      professionalExperience: updatedExperiences,
    }));
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddExperience();
    }
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Professional Experience</h2>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Company"
          name="companyName"
          value={currentExperience.companyName}
          onChange={(name, value) => handleCurrentExperienceChange(name, value)}
          onKeyDown={handleKeyPress}
        />
        <FormField
          label="Job Title"
          name="jobTitle"
          value={currentExperience.jobTitle}
          onChange={(name, value) => handleCurrentExperienceChange(name, value)}
          onKeyDown={handleKeyPress}
        />
        <FormField
          label="City"
          name="city"
          value={currentExperience.location.city}
          onChange={(name, value) => handleCurrentExperienceChange(name, value)}
          onKeyDown={handleKeyPress}
        />
        <FormField
          label="State"
          name="state"
          value={currentExperience.location.state}
          onChange={(name, value) => handleCurrentExperienceChange(name, value)}
          onKeyDown={handleKeyPress}
        />
        <div className="space-y-2">
          <label>Date Range</label>
          <DatePicker
            date={currentExperience.dates.start}
            setDate={(date) => handleCurrentExperienceChange("start", date)}
            placeholder="Start Date"
          />
          <DatePicker
            date={currentExperience.dates.end}
            setDate={(date) => handleCurrentExperienceChange("end", date)}
            placeholder="End Date"
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Responsibilities"
            items={currentExperience.responsibilities as string[]}
            setItems={(items) =>
              handleCurrentExperienceChange("responsibilities", items)
            }
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Accomplishments"
            items={currentExperience.accomplishments as string[]}
            setItems={(items) =>
              handleCurrentExperienceChange("accomplishments", items)
            }
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Skills Used"
            items={currentExperience.skillsUsed as string[]}
            setItems={(items) =>
              handleCurrentExperienceChange("skillsUsed", items)
            }
          />
        </div>
      </div>
      <Button
        onClick={handleAddExperience}
        disabled={
          !currentExperience.companyName ||
          !currentExperience.jobTitle ||
          !currentExperience.location.city ||
          !currentExperience.location.state ||
          !currentExperience.dates.start ||
          !currentExperience.dates.end
        }
        className="mt-2"
      >
        Add Experience
      </Button>

      {formData.professionalExperience &&
        formData.professionalExperience.length > 0 &&
        formData.professionalExperience.some(
          (exp) => exp.companyName && exp.jobTitle
        ) && (
          <div className="space-y-4 mt-6">
            {formData.professionalExperience.map(
              (exp, index) =>
                exp.companyName &&
                exp.jobTitle && (
                  <div
                    key={`exp-${index}`}
                    className="space-y-2 border p-4 rounded"
                  >
                    <p>
                      <strong>Company:</strong> {exp.companyName}
                    </p>
                    <p>
                      <strong>Job Title:</strong> {exp.jobTitle}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveExperience(index)}
                    >
                      Remove Experience
                    </Button>
                  </div>
                )
            )}
          </div>
        )}
    </div>
  );
};

export default ProfessionalExperienceComponent;
