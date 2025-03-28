"use client";
import React, { useState } from "react";
import { Award } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { useTime } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

interface AwardComponentProps {
  formData: Award;
  setFormData: (data: Award) => void;
}

const AwardComponent: React.FC = () => {
  const [formData, setFormData] = useState<AwardComponentProps>({
    title: "",
    year: undefined,
    description: "",
  });

  const handleChange = (key: keyof Award, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Awards</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Year</Label>
          <Input
            type="number"
            placeholder="year"
            value={formData.year}
            onChange={(e) => handleChange("year", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default AwardComponent;
