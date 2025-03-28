"use client";
import React, { useState } from "react";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";
import { HobbiesAndInterests } from "@/types/resume";

const HobbiesAndInterestComponent: React.FC = () => {
  const [formData, setFormData] = useState<HobbiesAndInterests>({
    event: [],
  });

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Hobbies and Interest</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <StringArrayInput
            label="Skills Used"
            items={formData.event}
            setItems={(items) =>
              setFormData((prev) => ({ ...prev, event: items }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HobbiesAndInterestComponent;
