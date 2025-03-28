"use client";
import React, { useState } from "react";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";
import { HobbiesAndInterests } from "@/types/resume";

export interface HobbiesAndInterestsProps {
  formData: HobbiesAndInterests[];
  setFormData: (data: HobbiesAndInterests[]) => void;
}

const HobbiesAndInterestComponent: React.FC<HobbiesAndInterestsProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Hobbies and Interest</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <StringArrayInput
            label="Skills Used"
            items={formData[0]?.event || []}
            setItems={(items) => setFormData([{ event: items }])}
          />
        </div>
      </div>
    </div>
  );
};

export default HobbiesAndInterestComponent;
