"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { VolunteerExperience, CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";
import DatePicker from "../ui/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Months } from "@/types/months";

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
      dates: {
        start: { month: "", year: undefined },
        end: { month: "", year: undefined },
      },
    }
  );

  const handleCurrentVolunteerChange = (
    key: keyof VolunteerExperience,
    value: any
  ) => {
    setCurrentVolunteer((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddVolunteer = () => {
    if (
      currentVolunteer.organization &&
      currentVolunteer.role &&
      currentVolunteer.description &&
      currentVolunteer.dates.start.month &&
      currentVolunteer.dates.start.year &&
      currentVolunteer.dates.end.month &&
      currentVolunteer.dates.end.year
    ) {
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
        dates: {
          start: { month: "", year: undefined },
          end: { month: "", year: undefined },
        },
      });
    }
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
            handleCurrentVolunteerChange("organization", value)
          }
        />
        <FormField
          label="Role"
          name="role"
          placeholder="Role"
          value={currentVolunteer.role}
          onChange={(name, value) =>
            handleCurrentVolunteerChange("role", value)
          }
        />
        <FormField
          label="Description"
          name="description"
          placeholder="Description"
          type="textarea"
          value={currentVolunteer.description}
          onChange={(name, value) =>
            handleCurrentVolunteerChange("description", value)
          }
        />
        <div className="space-y-2">
          <label>Date Range</label>
          <div className="flex gap-2">
            <Select
              value={currentVolunteer.dates.start.month}
              onValueChange={(value) =>
                handleCurrentVolunteerChange("dates", {
                  ...currentVolunteer.dates,
                  start: { ...currentVolunteer.dates.start, month: value },
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
              value={currentVolunteer.dates.start.year}
              onChange={(name, value) =>
                handleCurrentVolunteerChange("dates", {
                  ...currentVolunteer.dates,
                  start: { ...currentVolunteer.dates.start, year: value },
                })
              }
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={currentVolunteer.dates.end.month}
              onValueChange={(value) =>
                handleCurrentVolunteerChange("dates", {
                  ...currentVolunteer.dates,
                  end: { ...currentVolunteer.dates.end, month: value },
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
              value={currentVolunteer.dates.end.year}
              onChange={(name, value) =>
                handleCurrentVolunteerChange("dates", {
                  ...currentVolunteer.dates,
                  end: { ...currentVolunteer.dates.end, year: value },
                })
              }
            />
          </div>
        </div>
      </div>
      <Button
        onClick={handleAddVolunteer}
        disabled={
          !currentVolunteer.organization ||
          !currentVolunteer.role ||
          !currentVolunteer.description ||
          !currentVolunteer.dates.start.month ||
          !currentVolunteer.dates.start.year ||
          !currentVolunteer.dates.end.month ||
          !currentVolunteer.dates.end.year
        }
        className="mt-2"
      >
        Add Volunteer Experience
      </Button>
      {formData.volunteerExperience &&
        formData.volunteerExperience.length > 0 && (
          <div className="space-y-4 mt-6">
            {formData.volunteerExperience
              .filter(
                (volunteer) =>
                  volunteer &&
                  volunteer.organization &&
                  volunteer.role &&
                  volunteer.description
              )
              .map((volunteer, index) => (
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
                  <p>
                    <strong>Description:</strong> {volunteer.description}
                  </p>
                  {volunteer.dates && (
                    <p>
                      <strong>Dates:</strong> {volunteer.dates.start.month}{" "}
                      {volunteer.dates.start.year} - {volunteer.dates.end.month}{" "}
                      {volunteer.dates.end.year}
                    </p>
                  )}
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
        )}
    </div>
  );
};

export default VolunteerComponent;
