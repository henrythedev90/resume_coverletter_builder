"use client";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { JobPreferences, CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";
import { EmploymentTypes } from "@/types/employmentTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobPreferencesComponentProps {
  formData: CreateResumeInput;
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>;
}

const JobPreferencesComponent: React.FC<JobPreferencesComponentProps> = ({
  formData,
  setFormData,
}) => {
  const [currentJobPreference, setCurrentJobPreference] =
    useState<JobPreferences>(
      formData.jobPreferences || {
        desiredJobTitles: [],
        preferredIndustry: [],
        employmentType: "",
        preferredLocation: "",
      }
    );

  useEffect(() => {
    setCurrentJobPreference(
      formData.jobPreferences || {
        desiredJobTitles: [],
        preferredIndustry: [],
        employmentType: "",
        preferredLocation: "",
      }
    );
  }, [formData.jobPreferences]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      jobPreferences: currentJobPreference,
    }));
  }, [currentJobPreference, setFormData]);

  const handleJobPreferenceChange = (key: keyof JobPreferences, value: any) => {
    setCurrentJobPreference((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Job Preferences</h2>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Preferred Location"
          name="preferredLocation"
          placeholder="Preferred Location"
          value={currentJobPreference.preferredLocation}
          onChange={(_, value) =>
            handleJobPreferenceChange("preferredLocation", value)
          }
        />
        <div className="space-y-2">
          <label>Employment Type</label>
          <Select
            value={currentJobPreference?.employmentType}
            onValueChange={(value) =>
              handleJobPreferenceChange("employmentType", value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Employment Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(EmploymentTypes).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Desired Job Titles"
            items={currentJobPreference.desiredJobTitles || []}
            setItems={(items) =>
              handleJobPreferenceChange("desiredJobTitles", items)
            }
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Preferred Industry"
            items={currentJobPreference.preferredIndustry || []}
            setItems={(items) =>
              handleJobPreferenceChange("preferredIndustry", items)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default JobPreferencesComponent;
