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

  const handleCurrentAwardChange = (name: string, value: string) => {
    if (name in currentAward) {
      setCurrentAward((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleYearChange = (value: string) => {
    const yearNum = parseInt(value, 10);
    setCurrentAward((prev) => ({
      ...prev,
      year: !isNaN(yearNum) ? yearNum : undefined,
    }));
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
    setFormData((prev) => ({
      ...prev,
      awards: prev.awards?.filter((_, i) => i !== index) || [],
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Awards</h2>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Title"
          name="title"
          value={currentAward.title}
          onChange={handleCurrentAwardChange}
          placeholder="Enter award title"
        />
        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={currentAward.description}
          onChange={handleCurrentAwardChange}
          placeholder="Describe the award"
        />
        <FormField
          label="Year"
          name="year"
          type="number"
          value={currentAward.year ? currentAward.year.toString() : ""}
          onChange={(_, value) => handleYearChange(value)}
          placeholder="Year received"
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

      {formData.awards?.length > 0 && (
        <div className="space-y-4 mt-6">
          {formData.awards.map((award, index) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default AwardComponent;
