"use client";
import React, { useState } from "react";
import { Skills } from "@/types/resume";
import StringArrayInput from "../ui/StringArrayInput/StringArrayInput";

const SkillsComponent: React.FC = () => {
  const [formData, setFormData] = useState<Skills>({
    technical: [],
    soft: [],
    industrySpecific: [],
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Skills</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <StringArrayInput
            label="Technical"
            items={formData.technical as string[]}
            setItems={(items) =>
              setFormData((prev) => ({ ...prev, responsibilities: items }))
            }
          />
        </div>
        <div>
          <StringArrayInput
            label="Soft Skills"
            items={formData.soft as string[]}
            setItems={(items) =>
              setFormData((prev) => ({ ...prev, soft: items }))
            }
          />
        </div>
        <div>
          <StringArrayInput
            label="Industry Specific Skills"
            items={formData.industrySpecific as string[]}
            setItems={(items) =>
              setFormData((prev) => ({ ...prev, industrySpecific: items }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsComponent;
