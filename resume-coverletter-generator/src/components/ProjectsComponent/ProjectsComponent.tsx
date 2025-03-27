"use client";
import React, { useState } from "react";
import { Project } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";
import { Textarea } from "../ui/textarea";

const ProjectsComponents: React.FC = () => {
  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    role: "",
    portfolioLink: "",
    skillsUsed: [],
  });

  const handleChange = (key: keyof Project, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            placeholder="Job Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Input
            placeholder="Role"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
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
          <Label>Portfolio Link</Label>
          <Input
            placeholder="Portfolio Link"
            value={formData.portfolioLink}
            onChange={(e) => handleChange("portfolioLink", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Skills Used"
            items={formData.skillsUsed as string[]}
            setItems={(items) =>
              setFormData((prev) => ({ ...prev, skillsUsed: items }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsComponents;
