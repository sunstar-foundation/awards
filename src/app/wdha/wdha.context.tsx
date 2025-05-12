"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FormData = {
  full_time_employee: boolean;
  country: string;
  nominee: "myself" | "someone_else";
  first_name: string;
  last_name: string;
  address_line: string;
  email: string;
  confirm_certified_hygienist: boolean;
  graduation_time: 1 | 2 | 3 | 4 | 5;
};

type FormContextType = {
  formData: FormData;
  updateField: (field: string, value: any) => void;
  resetForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    full_time_employee: false,
    country: "",
    nominee: "myself",
    first_name: "",
    last_name: "",
  });

  const FORM_STORAGE_KEY = "wdha_form";

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FORM_STORAGE_KEY);
    if (stored) {
      setFormData(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on data change
  useEffect(() => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({});
    localStorage.removeItem(FORM_STORAGE_KEY);
  };

  return (
    <FormContext.Provider value={{ formData, updateField, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
