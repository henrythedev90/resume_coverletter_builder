"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Language, CreateResumeInput } from "@/types/resume";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/button";

interface LanguageComponentProps {
  formData: CreateResumeInput;
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>;
}

const LanguageComponent: React.FC<LanguageComponentProps> = ({
  formData,
  setFormData,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    language: "",
    proficiency: "",
  });

  const handleCurrentLanguageChange = (key: keyof Language, value: any) => {
    setCurrentLanguage((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddLanguage = () => {
    if (currentLanguage.language && currentLanguage.proficiency) {
      const updatedLanguages = [...(formData.languages || []), currentLanguage];
      setFormData((prev) => ({
        ...prev,
        languages: updatedLanguages,
      }));
      setCurrentLanguage({
        language: "",
        proficiency: "",
      });
    }
  };

  const handleRemoveLanguage = (index: number) => {
    const updatedLanguages = [...(formData.languages || [])];
    updatedLanguages.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      languages: updatedLanguages,
    }));
  };

  return (
    <div className="bg-background text-foreground space-y-4">
      <h2 className="text-2xl font-bold">Language</h2>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Language"
          name="language"
          placeholder="Language"
          value={currentLanguage.language}
          onChange={(name, value) =>
            handleCurrentLanguageChange("language", value)
          }
        />
        <FormField
          label="Proficiency"
          name="proficiency"
          placeholder="Proficiency"
          value={currentLanguage.proficiency}
          onChange={(name, value) =>
            handleCurrentLanguageChange("proficiency", value)
          }
        />
      </div>
      <Button
        onClick={handleAddLanguage}
        disabled={!currentLanguage.language || !currentLanguage.proficiency}
        className="mt-2"
      >
        Add Language
      </Button>
      {formData.languages && formData.languages.length > 0 && (
        <div className="space-y-4 mt-6">
          {formData.languages
            .filter(
              (language) =>
                language && language.language && language.proficiency
            )
            .map((language, index) => (
              <div
                key={`language-${index}`}
                className="space-y-2 border p-4 rounded"
              >
                <p>
                  <strong>Language:</strong> {language.language}
                </p>
                <p>
                  <strong>Proficiency:</strong> {language.proficiency}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveLanguage(index)}
                >
                  Remove Language
                </Button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LanguageComponent;
