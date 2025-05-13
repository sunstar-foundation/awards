"use client";

import { createContext, useContext, useEffect, useState } from "react";

type nomineeType = {
  value: string;
  label: string;
};

type countryType = {
  value: string;
  label: string;
  edhf: boolean;
};

type graduationType = {
  value: number;
  label: string;
};

type referalType = {
  value: string;
  label: string;
};

type categoryType = {
  value: string;
  label: string;
  description: string;
};

type FormData = {
  isNotFullTimeDentalEmployee: boolean;
  country: countryType | null;
  nominee: nomineeType | null;
  firstName: string;
  lastName: string;
  addressLine: string;
  email: string;
  isCertifiedHygienist: boolean;
  graduation: graduationType | null;
  referal: referalType | null;
  category: categoryType | null;
  howDidTheNomineeAssistedIndividualLives: string;
  howDidTheNomineeMadePositiveImpact: string;
  whatHasBeenTheNomineeGreatestAchievement: string;
  whatIsTheNomineeMostProudOf: string;
};

type FormContextType = {
  formData: FormData;
  updateField: (field: string, value: any) => void;
  resetForm: () => void;
};

const defaultFormData = {
  isNotFullTimeDentalEmployee: false,
  country: null,
  nominee: { value: "", label: "" },
  firstName: "",
  lastName: "",
  addressLine: "",
  email: "",
  isCertifiedHygienist: false,
  graduation: { value: 0, label: "" },
  referal: { value: "", label: "" },
  category: { value: "", label: "", description: "" },
  howDidTheNomineeAssistedIndividualLives: "",
  howDidTheNomineeMadePositiveImpact: "",
  whatHasBeenTheNomineeGreatestAchievement: "",
  whatIsTheNomineeMostProudOf: "",
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

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
    setFormData(defaultFormData);
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
