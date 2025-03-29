"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Skills, CreateResumeInput } from "@/types/resume";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";
import { Button } from "@/components/ui/button";

interface SkillsComponentProps {
  formData: CreateResumeInput;
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>;
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({
  formData,
  setFormData,
}) => {
  const [currentSkills, setCurrentSkills] = useState<Skills>({
    technical: [],
    soft: [],
    industrySpecific: [],
  });

  const handleSkillsChange = (key: keyof Skills, value: string[]) => {
    setCurrentSkills((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddSkills = () => {
    setFormData((prev) => ({
      ...prev,
      skills: currentSkills,
    }));
  };

  const handleRemoveSkills = () => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        technical: [],
        soft: [],
        industrySpecific: [],
      },
    }));
    setCurrentSkills({
      technical: [],
      soft: [],
      industrySpecific: [],
    });
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Skills</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <StringArrayInput
            label="Technical"
            items={currentSkills.technical || []}
            setItems={(items) => handleSkillsChange("technical", items)}
          />
        </div>
        <div>
          <StringArrayInput
            label="Soft Skills"
            items={currentSkills.soft || []}
            setItems={(items) => handleSkillsChange("soft", items)}
          />
        </div>
        <div>
          <StringArrayInput
            label="Industry Specific Skills"
            items={currentSkills.industrySpecific || []}
            setItems={(items) => handleSkillsChange("industrySpecific", items)}
          />
        </div>
      </div>
      <Button onClick={handleAddSkills} className="mt-2">
        Update Skills
      </Button>
      <Button
        onClick={handleRemoveSkills}
        className="mt-2"
        variant="destructive"
      >
        Clear Skills
      </Button>
    </div>
  );
};

export default SkillsComponent;
