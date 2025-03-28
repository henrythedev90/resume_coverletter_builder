"use client";
import React, { useEffect, useState } from "react";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";
import { HobbiesAndInterests, CreateResumeInput } from "@/types/resume";

export interface HobbiesAndInterestsProps {
  formData: CreateResumeInput;
  setFormData: React.Dispatch<React.SetStateAction<CreateResumeInput>>;
}

const HobbiesAndInterestComponent: React.FC<HobbiesAndInterestsProps> = ({
  formData,
  setFormData,
}) => {
  const [localHobbies, setLocalHobbies] = useState<HobbiesAndInterests[]>(
    formData.hobbiesAndInterests?.length
      ? formData.hobbiesAndInterests
      : [{ event: [] }]
  );

  useEffect(() => {
    if (formData.hobbiesAndInterests?.length) {
      setLocalHobbies(formData.hobbiesAndInterests);
    } else {
      setLocalHobbies([{ event: [] }]);
    }
  }, [formData.hobbiesAndInterests]);

  const handleHobbiesChange = (items: string[]) => {
    const updatedHobbies = [{ event: items }];
    setLocalHobbies(updatedHobbies);
    setFormData((prev) => ({
      ...prev,
      hobbiesAndInterests: updatedHobbies,
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Hobbies and Interest</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <StringArrayInput
            label="Hobbies & Interests"
            items={localHobbies[0]?.event || []}
            setItems={handleHobbiesChange}
          />
        </div>
      </div>
    </div>
  );
};

export default HobbiesAndInterestComponent;
