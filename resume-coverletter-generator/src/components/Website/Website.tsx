"use client";
import React, { useState } from "react";
import { Website } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WebsiteComponent: React.FC = () => {
  const [formData, setFormData] = useState<Website>({
    platform: "",
    url: "",
  });

  const handleChange = (key: keyof Website, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Website</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Platform</Label>
          <Input
            placeholder="Company Name"
            value={formData.platform}
            onChange={(e) => handleChange("platform", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Job Title</Label>
          <Input
            placeholder="URL"
            value={formData.url}
            onChange={(e) => handleChange("url", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default WebsiteComponent;
