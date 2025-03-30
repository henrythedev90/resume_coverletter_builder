"use client";
import React from "react";
import { FormField } from "@/components/ui/FormField";
import { CreateResumeInput } from "@/types/resume";

interface CareerObjectiveProps {
  formData: CreateResumeInput;
  setFormData: React.Dispatch<React.SetStateAction<CreateResumeInput>>;
}

const CareerObjectiveComponent: React.FC<CareerObjectiveProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Use dynamic key update
    }));
  };

  return (
    <div className="space-y-4">
      <FormField
        label="Career Objective"
        name="careerObjective"
        value={formData.careerObjective || ""}
        onChange={handleChange}
        placeholder="Enter your career objective"
        type="textarea"
      />
    </div>
  );
};

export default CareerObjectiveComponent;
