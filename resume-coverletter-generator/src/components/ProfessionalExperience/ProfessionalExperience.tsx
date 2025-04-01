"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { ProfessionalExperience, CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";
import { Button } from "@/components/ui/button";
import { USStates } from "@/types/states";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Months } from "@/types/months";

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
      dates: {
        start: { month: "", year: undefined },
        end: { month: "", year: undefined },
      },
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
            ...value,
          },
        };
      } else if (key === "location") {
        return {
          ...prev,
          location: {
            ...prev.location,
            ...value,
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
      currentExperience.jobTitle.trim() &&
      currentExperience.companyName.trim() &&
      currentExperience.location.city.trim() &&
      currentExperience.location.state.trim() &&
      currentExperience.dates.start.month &&
      currentExperience.dates.start.year &&
      currentExperience.responsibilities.length > 0 &&
      currentExperience.accomplishments.length > 0
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
        dates: {
          start: { month: "", year: undefined },
          end: { month: "", year: undefined },
        },
        responsibilities: [],
        accomplishments: [],
        skillsUsed: [],
      });
    } else {
      alert(
        "Job Title, Company Name, City, State, and Start Date are required."
      );
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
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select
              value={currentExperience.location.state || ""}
              onValueChange={(value) =>
                handleCurrentExperienceChange("location", { state: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(USStates).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <label>Date Range</label>
          <div className="flex gap-2">
            <Select
              value={currentExperience.dates.start.month}
              onValueChange={(value) =>
                handleCurrentExperienceChange("dates", {
                  start: { ...currentExperience.dates.start, month: value },
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Start Month" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Months).map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormField
              label="Start Year"
              name="startYear"
              placeholder="Year"
              type="number"
              value={currentExperience.dates.start.year}
              onChange={(name, value) =>
                handleCurrentExperienceChange("dates", {
                  start: { ...currentExperience.dates.start, year: value },
                })
              }
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={currentExperience.dates.end?.month}
              onValueChange={(value) =>
                handleCurrentExperienceChange("dates", {
                  end: { ...currentExperience.dates.end, month: value },
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="End Month" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Months).map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormField
              label="End Year"
              name="endYear"
              placeholder="Year"
              type="number"
              value={currentExperience.dates.end?.year}
              onChange={(name, value) =>
                handleCurrentExperienceChange("dates", {
                  end: { ...currentExperience.dates.end, year: value },
                })
              }
            />
          </div>
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
          !currentExperience.location.city ||
          !currentExperience.location.state
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
