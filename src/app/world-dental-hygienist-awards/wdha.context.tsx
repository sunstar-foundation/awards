"use client";

import { nomineeCategories } from "@/data/data";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { FormData } from "@/types/types";

type FormContextType = {
  formData: FormData;
  steps: number;
  setSteps: (steps: number) => void;
  updateField: (field: string, value: any) => void;
  resetForm: () => void;
};

const defaultFormData = {
  uniqueId: uuidv4(),
  isNotFullTimeDentalEmployee: false,
  agreesForNomineeInformationToBeMarketed: false,
  country: null,
  nominee: { value: "0", label: "Myself" },
  firstName: "",
  lastName: "",
  addressLine: "",
  email: "",
  isCertifiedHygienist: false,
  graduation: { value: 0, label: "" },
  referal: nomineeCategories[0],
  category: null,
  howDidTheNomineeAssistedIndividualLives: "",
  howDidTheNomineeMadePositiveImpact: "",
  whatHasBeenTheNomineeGreatestAchievement: "",
  whatIsTheNomineeMostProudOf: "",
  acceptedPrivacyPolicy: false,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [steps, setSteps] = useState(0);
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
    <FormContext.Provider
      value={{ formData, updateField, resetForm, steps, setSteps }}
    >
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
