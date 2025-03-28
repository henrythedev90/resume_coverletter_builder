"use client";
import React, { useState } from "react";
import { ProfessionalExperience, CreateResumeInput } from "@/types/resume";
import DatePicker from "../ui/DatePicker/DatePicker";
import { FormField } from "@/components/ui/FormField";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";

interface ProfessionalExperienceComponentProps {
  formData: CreateResumeInput;
  setFormData: React.Dispatch<React.SetStateAction<CreateResumeInput>>;
}

type LocationKeys = "city" | "state";

const ProfessionalExperienceComponent: React.FC<
  ProfessionalExperienceComponentProps
> = ({ formData, setFormData }) => {
  const [localExperience, setLocalExperience] =
    useState<ProfessionalExperience>(
      formData.professionalExperience &&
        formData.professionalExperience.length > 0
        ? formData.professionalExperience[0]
        : {
            companyName: "",
            jobTitle: "",
            location: { city: "", state: "" },
            dates: { start: undefined, end: undefined },
            responsibilities: [],
            accomplishments: [],
            skillsUsed: [],
          }
    );

  const handleChange = (
    name: string | keyof ProfessionalExperience,
    value: any
  ) => {
    if (name === "city" || name === "state") {
      handleLocationChange(name as LocationKeys, value as string);
    } else {
      setLocalExperience((prev) => ({
        ...prev,
        [name as keyof ProfessionalExperience]: value,
      }));
      setFormData((prev) => ({
        ...prev,
        professionalExperience: [
          {
            ...prev.professionalExperience[0],
            [name as keyof ProfessionalExperience]: value,
          },
        ],
      }));
    }
  };

  const handleLocationChange = (name: LocationKeys, value: string) => {
    setLocalExperience((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
    setFormData((prev) => ({
      ...prev,
      professionalExperience: [
        {
          ...prev.professionalExperience[0],
          location: {
            ...prev.professionalExperience[0].location,
            [name]: value,
          },
        },
      ],
    }));
  };

  const handleDateChange = (name: "start" | "end", value: Date | undefined) => {
    setLocalExperience((prev) => ({
      ...prev,
      dates: {
        ...prev.dates,
        [name]: value,
      },
    }));
    setFormData((prev) => ({
      ...prev,
      professionalExperience: [
        {
          ...prev.professionalExperience[0],
          dates: {
            ...prev.professionalExperience[0].dates,
            [name]: value,
          },
        },
      ],
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Professional Experience</h2>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Company"
          name="companyName"
          value={localExperience.companyName}
          onChange={handleChange}
        />
        <FormField
          label="Job Title"
          name="jobTitle"
          value={localExperience.jobTitle}
          onChange={handleChange}
        />
        <FormField
          label="City"
          name="city"
          value={localExperience.location.city}
          onChange={handleChange}
        />
        <FormField
          label="State"
          name="state"
          value={localExperience.location.state}
          onChange={handleChange}
        />
        <div className="space-y-2">
          <label>Date Range</label>
          <DatePicker
            date={localExperience.dates.start}
            setDate={(date) => handleDateChange("start", date)}
            placeholder="Start Date"
          />
          <DatePicker
            date={localExperience.dates.end}
            setDate={(date) => handleDateChange("end", date)}
            placeholder="End Date"
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Responsibilities"
            items={localExperience.responsibilities as string[]}
            setItems={(items) => handleChange("responsibilities", items)}
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Accomplishments"
            items={localExperience.accomplishments as string[]}
            setItems={(items) => handleChange("accomplishments", items)}
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Skills Used"
            items={localExperience.skillsUsed as string[]}
            setItems={(items) => handleChange("skillsUsed", items)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalExperienceComponent;
