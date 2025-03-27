"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VolunteerExperience } from "@/types/resume";
import DatePicker from "../ui/DatePicker/DatePicker";
import { Textarea } from "../ui/textarea";

const VolunteerComponent: React.FC = () => {
  const [formData, setFormData] = useState<VolunteerExperience>({
    organization: "",
    role: "",
    description: "",
    dates: { start: undefined, end: undefined },
  });
  const handleChange = (key: keyof VolunteerExperience, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Volunteer Experience</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Organization</Label>
          <Input
            placeholder="Organization"
            value={formData.organization}
            onChange={(e) => handleChange("organization", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Input
            placeholder="Role"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Date Range</Label>
          <DatePicker
            date={formData.dates?.start}
            setDate={(date) => handleDateChange("start", date)}
            placeholder="Start Date"
          />
          <DatePicker
            date={formData.dates?.end}
            setDate={(date) => handleDateChange("end", date)}
            placeholder="End Date"
          />
        </div>
      </div>
    </div>
  );
};

export default VolunteerComponent;
