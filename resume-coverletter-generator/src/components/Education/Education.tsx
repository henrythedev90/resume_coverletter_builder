"use client";
import React, { useState } from "react";
import { Education } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";
import DatePicker from "../ui/DatePicker/DatePicker";

const EducationComponent: React.FC = () => {
  const [formData, setFormData] = useState<Education>({
    degree: "",
    fieldOfStudy: "",
    universityName: "",
    graduationYear: undefined,
    certifications: [],
  });

  const handleChange = (key: keyof Education, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateChange = (key: "start" | "end", value: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      graduationYear: {
        ...prev.graduationYear,
        [key]: value,
      },
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Education</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>School Name</Label>
          <Input
            placeholder="School Name"
            value={formData.universityName}
            onChange={(e) => handleChange("universityName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Field of Study</Label>
          <Input
            placeholder="Field of Study"
            value={formData.fieldOfStudy}
            onChange={(e) => handleChange("fieldOfStudy", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Degree</Label>
          <Input
            placeholder="Degree"
            value={formData.degree}
            onChange={(e) => handleChange("degree", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Date Range</Label>
          <DatePicker
            date={formData.graduationYear?.start}
            setDate={(date) => handleDateChange("start", date)}
            placeholder="Start Date"
          />
          <DatePicker
            date={formData.graduationYear?.end}
            setDate={(date) => handleDateChange("end", date)}
            placeholder="End Date"
          />
        </div>
        <div>
          <StringArrayInput
            label="Certications"
            items={formData.certifications as string[]}
            setItems={(items) =>
              setFormData((prev) => ({ ...prev, certifications: items }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EducationComponent;
