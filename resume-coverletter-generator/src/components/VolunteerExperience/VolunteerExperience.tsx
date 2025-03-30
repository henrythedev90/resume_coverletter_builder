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
      dates: { start: new Date(), end: new Date() },
    }
  );

  const handleCurrentVolunteerChange = (
    key: keyof VolunteerExperience,
    value: any
  ) => {
    setCurrentVolunteer((prev) => {
      if (
        key === "dates" &&
        (value as { start: Date | undefined; end: Date | undefined }).start
      ) {
        return {
          ...prev,
          dates: {
            ...prev.dates,
            start: (value as { start: Date | undefined; end: Date | undefined })
              .start as Date,
          },
        };
      } else if (
        key === "dates" &&
        (value as { start: Date | undefined; end: Date | undefined }).end
      ) {
        return {
          ...prev,
          dates: {
            ...prev.dates,
            end: (value as { start: Date | undefined; end: Date | undefined })
              .end as Date,
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

  const handleAddVolunteer = () => {
    if (
      currentVolunteer.organization &&
      currentVolunteer.role &&
      currentVolunteer.description &&
      currentVolunteer.dates.start &&
      currentVolunteer.dates.end
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
        dates: { start: new Date(), end: new Date() },
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
          <DatePicker
            date={currentVolunteer.dates?.start}
            setDate={(date) =>
              handleCurrentVolunteerChange("dates", {
                ...currentVolunteer.dates,
                start: date,
              })
            }
            placeholder="Start Date"
          />
          <DatePicker
            date={currentVolunteer.dates?.end}
            setDate={(date) =>
              handleCurrentVolunteerChange("dates", {
                ...currentVolunteer.dates,
                end: date,
              })
            }
            placeholder="End Date"
          />
        </div>
      </div>
      <Button
        onClick={handleAddVolunteer}
        disabled={
          !currentVolunteer.organization ||
          !currentVolunteer.role ||
          !currentVolunteer.description ||
          !currentVolunteer.dates.start ||
          !currentVolunteer.dates.end
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
                      <strong>Dates:</strong>{" "}
                      {volunteer.dates.start.toLocaleDateString()} -{" "}
                      {volunteer.dates.end.toLocaleDateString()}
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
