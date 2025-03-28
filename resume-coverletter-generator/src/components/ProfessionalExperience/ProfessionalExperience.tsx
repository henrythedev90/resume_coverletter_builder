"use client";
import React, { useState } from "react";
import { ProfessionalExperience } from "@/types/resume";
import DatePicker from "../ui/DatePicker/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";

const ProfessionalExperienceComponent: React.FC = () => {
  const [formData, setFormData] = useState<ProfessionalExperience>({
    companyName: "",
    jobTitle: "",
    location: { city: "", state: "" },
    dates: { start: undefined, end: undefined },
    responsibilities: [],
    accomplishments: [],
    skillsUsed: [],
  });

  const handleChange = (key: keyof ProfessionalExperience, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLocationChange = (key: "city" | "state", value: string) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [key]: value,
      },
    }));
  };

  const handleDateChange = (key: "start" | "end", value: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      dates: {
        ...prev.dates,
        [key]: value,
      },
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Professional Experience</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Company</Label>
          <Input
            placeholder="Company Name"
            value={formData.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Job Title</Label>
          <Input
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            placeholder="City"
            value={formData.location.city}
            onChange={(e) => handleLocationChange("city", e.target.value)}
          />
          <Input
            placeholder="State"
            value={formData.location.state}
            onChange={(e) => handleLocationChange("state", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Date Range</Label>
          <DatePicker
            date={formData.dates.start}
            setDate={(date) => handleDateChange("start", date)}
            placeholder="Start Date"
          />
          <DatePicker
            date={formData.dates.end}
            setDate={(date) => handleDateChange("end", date)}
            placeholder="End Date"
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Responsibilities"
            items={formData.responsibilities as string[]}
            setItems={(items) =>
              setFormData((prev) => ({ ...prev, responsibilities: items }))
            }
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Accomplishments"
            items={formData.accomplishments as string[]}
            setItems={(items) =>
              setFormData((prev) => ({ ...prev, accomplishments: items }))
            }
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Skills Used"
            items={formData.skillsUsed as string[]}
            setItems={(items) =>
              setFormData((prev) => ({ ...prev, skillsUsed: items }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalExperienceComponent;
