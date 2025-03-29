"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Project, CreateResumeInput } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";

interface ProjectsComponentsProps {
  formData: CreateResumeInput;
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>;
}

const ProjectsComponents: React.FC<ProjectsComponentsProps> = ({
  formData,
  setFormData,
}) => {
  const [currentProject, setCurrentProject] = useState<Project>({
    title: "",
    description: "",
    role: "",
    portfolioLink: "",
    skillsUsed: [],
  });

  const handleProjectChange = (key: keyof Project, value: any) => {
    setCurrentProject((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddProject = () => {
    const updatedProjects = [...(formData.projects || []), currentProject];
    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));
    setCurrentProject({
      title: "",
      description: "",
      role: "",
      portfolioLink: "",
      skillsUsed: [],
    });
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = [...(formData.projects || [])];
    updatedProjects.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            placeholder="Job Title"
            value={currentProject.title}
            onChange={(e) => handleProjectChange("title", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Input
            placeholder="Role"
            value={currentProject.role}
            onChange={(e) => handleProjectChange("role", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Description"
            value={currentProject.description}
            onChange={(e) => handleProjectChange("description", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Portfolio Link</Label>
          <Input
            placeholder="Portfolio Link"
            value={currentProject.portfolioLink}
            onChange={(e) =>
              handleProjectChange("portfolioLink", e.target.value)
            }
          />
        </div>
        <div className="space-y-2">
          <StringArrayInput
            label="Skills Used"
            items={currentProject.skillsUsed || []}
            setItems={(items) => handleProjectChange("skillsUsed", items)}
          />
        </div>
      </div>
      <Button onClick={handleAddProject} className="mt-2">
        Add Project
      </Button>
      {formData.projects &&
        formData.projects.length > 0 &&
        formData.projects.map((project, index) => (
          <div
            key={`project-${index}`}
            className="space-y-2 border p-4 rounded"
          >
            <p>
              <strong>Title:</strong> {project.title}
            </p>
            <p>
              <strong>Role:</strong> {project.role}
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveProject(index)}
            >
              Remove Project
            </Button>
          </div>
        ))}
    </div>
  );
};

export default ProjectsComponents;
