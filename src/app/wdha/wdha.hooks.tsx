"use client";

import { useFormContext } from "./wdha.context";

export function useFormField<T>(field: string) {
  const { formData, updateField } = useFormContext();

  const value = formData[field] || "";

  const setValue = (newValue: T) => {
    updateField(field, newValue);
  };

  return [value, setValue] as const;
}
export function useFormFieldNumber(field: string) {
  const { formData, updateField } = useFormContext();

  const value = formData[field] || 0;

  const setValue = (newValue: number) => {
    updateField(field, newValue);
  };

  return [value, setValue] as const;
}
