"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { ProfessionalExperience, CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";
import DatePicker from "../ui/DatePicker/DatePicker";
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
      jobTitle: "",
      companyName: "",
      location: { city: "", state: "" },
      dates: { start: new Date(), end: new Date() },
      responsibilities: [],
      accomplishments: [],
      skillsUsed: [],
    });

  const handleCurrentExperienceChange = (
    key: keyof ProfessionalExperience,
    value: any
  ) => {
    setCurrentExperience((prev) => {
      if (key === "dates") {
        return {
          ...prev,
          dates: {
            ...prev.dates,
            ...value, // Simply merge the date changes
          },
        };
      } else if (key === "location") {
        return {
          ...prev,
          location: {
            ...prev.location,
            ...value, // Merge location changes
          },
        };
      } else {
        return {
          ...prev,
          [key]: value,
        };
      }
    });
  };

  const handleAddExperience = () => {
    if (
      currentExperience.jobTitle &&
      currentExperience.companyName &&
      currentExperience.location &&
      currentExperience.dates.start &&
      currentExperience.dates.end
    ) {
      const updatedExperiences = [
        ...(formData.professionalExperience || []),
        currentExperience,
      ];
      setFormData((prev) => ({
        ...prev,
        professionalExperience: updatedExperiences,
      }));
      setCurrentExperience({
        jobTitle: "",
        companyName: "",
        location: { city: "", state: "" },
        dates: { start: new Date(), end: new Date() },
        responsibilities: [],
        accomplishments: [],
        skillsUsed: [],
      });
    } else {
      alert("Job Title, Company Name, and Location are required.");
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

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Professional Experience</h2>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Job Title"
          name="jobTitle"
          placeholder="Job Title"
          value={currentExperience.jobTitle}
          onChange={(name, value) =>
            handleCurrentExperienceChange("jobTitle", value)
          }
        />
        <FormField
          label="Company Name"
          name="companyName"
          placeholder="Company Name"
          value={currentExperience.companyName}
          onChange={(name, value) =>
            handleCurrentExperienceChange("companyName", value)
          }
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            label="City"
            name="city"
            placeholder="City"
            value={currentExperience.location.city}
            onChange={(name, value) =>
              handleCurrentExperienceChange("location", { city: value })
            }
          />
          <FormField
            label="State"
            name="state"
            placeholder="State"
            value={currentExperience.location.state}
            onChange={(name, value) =>
              handleCurrentExperienceChange("location", { state: value })
            }
          />
        </div>
        <div className="space-y-2">
          <label>Date Range</label>
          <DatePicker
            date={currentExperience.dates?.start}
            setDate={(date) =>
              handleCurrentExperienceChange("dates", {
                ...currentExperience.dates,
                start: date,
              })
            }
            placeholder="Start Date"
          />
          <DatePicker
            date={currentExperience.dates?.end}
            setDate={(date) =>
              handleCurrentExperienceChange("dates", {
                ...currentExperience.dates,
                end: date,
              })
            }
            placeholder="End Date"
          />
        </div>
        <StringArrayInput
          label="Responsibilities"
          items={currentExperience.responsibilities}
          setItems={(items) =>
            handleCurrentExperienceChange("responsibilities", items)
          }
        />
        <StringArrayInput
          label="Accomplishments"
          items={currentExperience.accomplishments}
          setItems={(items) =>
            handleCurrentExperienceChange("accomplishments", items)
          }
        />
        <StringArrayInput
          label="Skills Used"
          items={currentExperience.skillsUsed}
          setItems={(items) =>
            handleCurrentExperienceChange("skillsUsed", items)
          }
        />
      </div>
      <Button
        onClick={handleAddExperience}
        disabled={
          !currentExperience.jobTitle ||
          !currentExperience.companyName ||
          !currentExperience.location
        }
        className="mt-2"
      >
        Add Experience
      </Button>
      {formData.professionalExperience &&
        formData.professionalExperience.length > 0 && (
          <div className="space-y-4 mt-6">
            {formData.professionalExperience
              .filter(
                (experience) =>
                  experience && experience.jobTitle && experience.companyName
              )
              .map((experience, index) => (
                <div
                  key={`experience-${index}`}
                  className="space-y-2 border p-4 rounded"
                >
                  <p>
                    <strong>Job Title:</strong> {experience.jobTitle}
                  </p>
                  <p>
                    <strong>Company Name:</strong> {experience.companyName}
                  </p>
                  <p>
                    <strong>City:</strong> {experience.location.city}
                  </p>
                  <p>
                    <strong>State:</strong> {experience.location.state}
                  </p>
                  <p>
                    <strong>Responsibilities:</strong>{" "}
                    {experience.responsibilities.join(", ")}
                  </p>
                  <p>
                    <strong>Accomplishments:</strong>{" "}
                    {experience.accomplishments.join(", ")}
                  </p>
                  <p>
                    <strong>Skills Used:</strong>{" "}
                    {experience.skillsUsed.join(", ")}
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveExperience(index)}
                  >
                    Remove Experience
                  </Button>
                </div>
              ))}
          </div>
        )}
    </div>
  );
};

export default ProfessionalExperienceComponent;
