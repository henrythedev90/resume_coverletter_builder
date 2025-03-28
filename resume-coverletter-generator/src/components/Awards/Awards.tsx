"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
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

  const handleCurrentAwardChange = (name: string, value: any) => {
    setCurrentAward({ ...currentAward, [name]: value });
  };

  const handleAddAward = () => {
    if (currentAward.title && currentAward.description && currentAward.year) {
      const updatedAwards = [...(formData.awards || []), currentAward].sort(
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

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddAward();
    }
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Awards</h2>

      {/* Form for adding new award */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Title"
          name="title"
          value={currentAward.title}
          onChange={handleCurrentAwardChange}
          onKeyDown={handleKeyPress}
          placeholder="Enter award title"
        />
        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={currentAward.description}
          onChange={handleCurrentAwardChange}
          onKeyDown={handleKeyPress}
          placeholder="Describe the award"
        />
        <FormField
          label="Year"
          name="year"
          type="number"
          value={currentAward.year}
          onChange={handleCurrentAwardChange}
          onKeyDown={handleKeyPress}
          placeholder="Year received"
        />
      </div>

      {/* Add button */}
      <Button
        onClick={handleAddAward}
        disabled={
          !currentAward.title || !currentAward.description || !currentAward.year
        }
        className="mt-2"
      >
        Add Award
      </Button>

      {/* Display awards only if there are any */}
      {formData.awards &&
        formData.awards.length > 0 &&
        formData.awards.some(
          (award) => award.title && award.description && award.year
        ) && (
          <div className="space-y-4 mt-6">
            {formData.awards.map(
              (award, index) =>
                award.title &&
                award.description &&
                award.year && (
                  <div
                    key={`award-${index}`}
                    className="space-y-2 border p-4 rounded"
                  >
                    <p>
                      <strong>Title:</strong> {award.title}
                    </p>
                    <p>
                      <strong>Description:</strong> {award.description}
                    </p>
                    <p>
                      <strong>Year:</strong> {award.year}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveAward(index)}
                    >
                      Remove Award
                    </Button>
                  </div>
                )
            )}
          </div>
        )}
    </div>
  );
};

export default AwardComponent;
