import { CreateResumeInput } from "@/types/resume";
import { SetStateAction, Dispatch } from "react";

export const addItem = <T extends keyof CreateResumeInput>(
  propertyName: T,
  newItem: CreateResumeInput[T] extends Array<infer U> ? U : any,
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>
) => {
  setFormData((prev) => {
    const currentItems = (prev[propertyName] || []) as CreateResumeInput[T];
    return {
      ...prev,
      [propertyName]: [...(currentItems as any[]), newItem],
    };
  });
};

export const removeItem = <T extends keyof CreateResumeInput>(
  propertyName: T,
  index: number,
  setFormData: Dispatch<SetStateAction<CreateResumeInput>>
) => {
  setFormData((prev) => {
    const currentItems = (prev[propertyName] || []) as CreateResumeInput[T];
    return {
      ...prev,
      [propertyName]: (currentItems as any[]).filter((_, i) => i !== index),
    };
  });
};
