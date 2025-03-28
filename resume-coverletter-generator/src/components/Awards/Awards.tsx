"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Award, CreateResumeInput } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { useTime } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { addItem, removeItem } from "../Resume/Resume";

interface AwardComponentProps {
  formData: Award[];
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>;
}

const AwardComponent: React.FC<AwardComponentProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (key: keyof Award, value: any, index: number) => {
    setFormData((prev) => {
      const awards = prev.awards || []; // Add defensive check
      const updatedAwards = [...awards];
      updatedAwards[index] = {
        ...updatedAwards[index],
        [key]: value, //removed the type and value object.
      };
      return { ...prev, awards: updatedAwards };
    });
  };

  const handleAddAward = () => {
    addItem(
      "awards",
      { title: "", year: undefined, description: "" },
      setFormData
    );
  };

  const handleRemoveAward = (index: number) => {
    removeItem("awards", index, setFormData);
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Awards</h2>
      {formData &&
        formData.map(
          (
            award,
            index //add check.
          ) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="Title"
                  value={award.title}
                  onChange={(e) => handleChange("title", e.target.value, index)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Description"
                  value={award.description}
                  onChange={(e) =>
                    handleChange("description", e.target.value, index)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  type="number"
                  placeholder="year"
                  value={award.year}
                  onChange={(e) => handleChange("year", e.target.value, index)}
                />
              </div>
              <button onClick={() => handleRemoveAward(index)}>
                Remove Award
              </button>
            </div>
          )
        )}
      <button onClick={handleAddAward}>Add Award</button>
    </div>
  );
};
export default AwardComponent;
