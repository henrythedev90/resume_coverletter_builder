"use client";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { CreateResumeInput } from "@/types/resume";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";

interface HobbiesAndInterestComponentProps {
  formData: CreateResumeInput;
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>;
}

const HobbiesAndInterestComponent: React.FC<
  HobbiesAndInterestComponentProps
> = ({ formData, setFormData }) => {
  const [localHobbies, setLocalHobbies] = useState<string[]>(
    formData.hobbiesAndInterests?.length &&
      formData.hobbiesAndInterests[0]?.event?.length
      ? formData.hobbiesAndInterests[0].event
      : []
  );

  const handleHobbiesChange = (items: string[]) => {
    setLocalHobbies(items);
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      hobbiesAndInterests: [{ event: localHobbies }], // Keep structure for consistency
    }));
  }, [localHobbies, setFormData]);

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Hobbies & Interests</h2>
      <div className="space-y-2">
        <StringArrayInput
          label="Hobbies/Interests"
          items={localHobbies}
          setItems={handleHobbiesChange}
        />
      </div>
    </div>
  );
};

export default HobbiesAndInterestComponent;
