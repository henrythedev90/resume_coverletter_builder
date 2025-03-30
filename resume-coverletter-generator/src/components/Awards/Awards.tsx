"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Award, CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/button";

interface AwardComponentProps {
  formData: CreateResumeInput;
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>;
}

const AwardComponent: React.FC<AwardComponentProps> = ({
  formData,
  setFormData,
}) => {
  const [currentAward, setCurrentAward] = useState<Award>({
    title: "",
    year: undefined,
    description: "",
  });

  const handleCurrentAwardChange = (name: string | keyof Award, value: any) => {
    setCurrentAward((prev) => ({
      ...prev,
      [name as keyof Award]: value,
    }));
  };

  const handleAddAward = () => {
    if (currentAward.title && currentAward.description && currentAward.year) {
      const newAward: Award = {
        title: currentAward.title,
        description: currentAward.description,
        year: currentAward.year,
      };

      const updatedAwards = [...(formData.awards || []), newAward].sort(
        (a, b) => (b.year || 0) - (a.year || 0)
      );
      setFormData((prev) => ({ ...prev, awards: updatedAwards }));
      setCurrentAward({ title: "", year: undefined, description: "" });
    }
  };

  const handleRemoveAward = (index: number) => {
    const updatedAwards = [...(formData.awards || [])];
    updatedAwards.splice(index, 1);
    setFormData((prev) => ({ ...prev, awards: updatedAwards }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Awards</h2>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Title"
          name="title"
          placeholder="Title"
          value={currentAward.title}
          onChange={(name, value) => handleCurrentAwardChange(name, value)}
        />
        <FormField
          label="Year"
          name="year"
          type="number"
          placeholder="Year"
          value={currentAward.year}
          onChange={(name, value) => handleCurrentAwardChange(name, value)}
        />
        <FormField
          label="Description"
          name="description"
          placeholder="Description"
          value={currentAward.description}
          onChange={(name, value) => handleCurrentAwardChange(name, value)}
        />
      </div>
      <Button
        onClick={handleAddAward}
        disabled={
          !currentAward.title || !currentAward.description || !currentAward.year
        }
        className="mt-2"
      >
        Add Award
      </Button>

      {formData.awards && formData.awards.length > 0 && (
        <div className="space-y-4 mt-6">
          {formData.awards
            .filter((award) => award.title && award.description && award.year)
            .map((award, index) => (
              <div
                key={`award-${index}`}
                className="space-y-2 border p-4 rounded"
              >
                <p>
                  <strong>Title:</strong> {award.title}
                </p>
                <p>
                  <strong>Year:</strong> {award.year}
                </p>
                <p>
                  <strong>Description:</strong> {award.description}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveAward(index)}
                >
                  Remove Award
                </Button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AwardComponent;
