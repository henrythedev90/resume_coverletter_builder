"use client";
import React, { useState } from "react";
import { Language } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LanguageComponent: React.FC = () => {
  const [formData, setFormData] = useState<Language>({
    language: "",
    proficiency: "",
  });

  const handleChange = (key: keyof Language, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Language</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Language</Label>
          <Input
            placeholder="language"
            value={formData.language}
            onChange={(e) => handleChange("language", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Proficiency</Label>
          <Input
            placeholder="proficiency"
            value={formData.proficiency}
            onChange={(e) => handleChange("proficiency", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default LanguageComponent;
