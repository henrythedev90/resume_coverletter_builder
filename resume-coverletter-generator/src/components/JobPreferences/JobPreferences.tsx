"use client";
import React, { useState } from "react";
import { JobPreferences } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";

const JobPreferencesComponent: React.FC = () => {
  const [formData, setFormData] = useState<JobPreferences>({
    desiredJobTitles: [],
    preferredIndustry: [],
    employmentType: "",
    preferredLocation: "",
  });

  const handleChange = (key: keyof JobPreferences, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Job Preferences</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Preferred Location</Label>
          <Input
            placeholder="Preferred Location"
            value={formData.preferredLocation}
            onChange={(e) => handleChange("preferredLocation", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Employment Type</Label>
          <Input
            placeholder="Employment Type"
            value={formData.employmentType}
            onChange={(e) => handleChange("employmentType", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Desired Job Titles"
            items={formData.desiredJobTitles as string[]}
            setItems={(items) =>
              setFormData((prev) => ({ ...prev, desiredJobTitles: items }))
            }
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Preferred Industry"
            items={formData.preferredIndustry as string[]}
            setItems={(items) =>
              setFormData((prev) => ({ ...prev, preferredIndustry: items }))
            }
          />
        </div>
      </div>
    </div>
  );
};
export default JobPreferencesComponent;
