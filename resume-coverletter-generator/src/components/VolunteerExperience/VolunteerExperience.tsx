"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { VolunteerExperience, CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";
import DatePicker from "../ui/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";

interface VolunteerComponentProps {
  formData: CreateResumeInput;
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>;
}

const VolunteerComponent: React.FC<VolunteerComponentProps> = ({
  formData,
  setFormData,
}) => {
  const [currentVolunteer, setCurrentVolunteer] = useState<VolunteerExperience>(
    {
      organization: "",
      role: "",
      description: "",
      dates: { start: undefined, end: undefined },
    }
  );

  const handleVolunteerChange = (
    key: keyof VolunteerExperience,
    value: any
  ) => {
    setCurrentVolunteer((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateChange = (key: "start" | "end", value: Date | undefined) => {
    setCurrentVolunteer((prev) => ({
      ...prev,
      dates: {
        ...prev.dates,
        [key]: value,
      },
    }));
  };

  const handleAddVolunteer = () => {
    const updatedVolunteers = [
      ...(formData.volunteerExperience || []),
      currentVolunteer,
    ];
    setFormData((prev) => ({
      ...prev,
      volunteerExperience: updatedVolunteers,
    }));
    setCurrentVolunteer({
      organization: "",
      role: "",
      description: "",
      dates: { start: undefined, end: undefined },
    });
  };

  const handleRemoveVolunteer = (index: number) => {
    const updatedVolunteers = [...(formData.volunteerExperience || [])];
    updatedVolunteers.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      volunteerExperience: updatedVolunteers,
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Volunteer Experience</h2>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Organization"
          name="organization"
          placeholder="Organization"
          value={currentVolunteer.organization}
          onChange={(name, value) =>
            handleVolunteerChange("organization", value)
          }
        />
        <FormField
          label="Role"
          name="role"
          placeholder="Role"
          value={currentVolunteer.role}
          onChange={(name, value) => handleVolunteerChange("role", value)}
        />
        <FormField
          label="Description"
          name="description"
          placeholder="Description"
          type="textarea"
          value={currentVolunteer.description}
          onChange={(name, value) =>
            handleVolunteerChange("description", value)
          }
        />
        <div className="space-y-2">
          <label>Date Range</label>
          <DatePicker
            date={currentVolunteer.dates?.start}
            setDate={(date) => handleDateChange("start", date)}
            placeholder="Start Date"
          />
          <DatePicker
            date={currentVolunteer.dates?.end}
            setDate={(date) => handleDateChange("end", date)}
            placeholder="End Date"
          />
        </div>
      </div>
      <Button onClick={handleAddVolunteer} className="mt-2">
        Add Volunteer Experience
      </Button>
      {formData.volunteerExperience &&
        formData.volunteerExperience.length > 0 &&
        formData.volunteerExperience.map((volunteer, index) => (
          <div
            key={`volunteer-${index}`}
            className="space-y-2 border p-4 rounded"
          >
            <p>
              <strong>Organization:</strong> {volunteer.organization}
            </p>
            <p>
              <strong>Role:</strong> {volunteer.role}
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveVolunteer(index)}
            >
              Remove Volunteer Experience
            </Button>
          </div>
        ))}
    </div>
  );
};

export default VolunteerComponent;
