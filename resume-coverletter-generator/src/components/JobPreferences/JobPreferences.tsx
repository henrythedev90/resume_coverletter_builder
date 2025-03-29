"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { JobPreferences, CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";

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
      formData.jobPreferences
        ? formData.jobPreferences
        : {
            desiredJobTitles: [],
            preferredIndustry: [],
            employmentType: "",
            preferredLocation: "",
          }
    );

  const handleJobPreferenceChange = (key: keyof JobPreferences, value: any) => {
    setCurrentJobPreference((prev) => ({
      ...prev,
      [key]: value,
    }));
    setFormData((prev) => ({
      ...prev,
      jobPreferences: { ...prev.jobPreferences, [key]: value },
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
        <FormField
          label="Employment Type"
          name="employmentType"
          placeholder="Employment Type"
          value={currentJobPreference.employmentType}
          onChange={(_, value) =>
            handleJobPreferenceChange("employmentType", value)
          }
        />
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
