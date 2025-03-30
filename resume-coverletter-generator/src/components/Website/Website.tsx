"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Website, CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/button";

interface WebsiteComponentProps {
  formData: CreateResumeInput;
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>;
}

const WebsiteComponent: React.FC<WebsiteComponentProps> = ({
  formData,
  setFormData,
}) => {
  const [currentWebsite, setCurrentWebsite] = useState<Website>({
    platform: "",
    url: "",
  });

  const handleWebsiteChange = (key: keyof Website, value: any) => {
    setCurrentWebsite((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddWebsite = () => {
    const updatedWebsites = [...(formData.websites || []), currentWebsite];
    setFormData((prev) => ({
      ...prev,
      websites: updatedWebsites,
    }));
    setCurrentWebsite({
      platform: "",
      url: "",
    });
  };

  const handleRemoveWebsite = (index: number) => {
    const updatedWebsites = [...(formData.websites || [])];
    updatedWebsites.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      websites: updatedWebsites,
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Website</h2>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Platform"
          name="platform"
          placeholder="Platform"
          value={currentWebsite.platform}
          onChange={(name, value) => handleWebsiteChange("platform", value)}
        />
        <FormField
          label="URL"
          name="url"
          placeholder="URL"
          value={currentWebsite.url}
          onChange={(name, value) => handleWebsiteChange("url", value)}
        />
      </div>
      <Button onClick={handleAddWebsite} className="mt-2">
        Add Website
      </Button>
      {formData.websites &&
        formData.websites.length > 0 &&
        formData.websites.some(
          (website) => website && (website.platform || website.url)
        ) &&
        formData.websites.map((website, index) => (
          <div
            key={`website-${index}`}
            className="space-y-2 border p-4 rounded"
          >
            <p>
              <strong>Platform:</strong> {website.platform}
            </p>
            <p>
              <strong>URL:</strong> {website.url}
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveWebsite(index)}
            >
              Remove Website
            </Button>
          </div>
        ))}
    </div>
  );
};

export default WebsiteComponent;
