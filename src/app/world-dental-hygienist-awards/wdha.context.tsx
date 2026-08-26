"use client";

import { nomineeCategories, refereeOptionsWDHA } from "@/data/data";
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

const defaultFormData: FormData = {
  uniqueId: uuidv4(),
  isNotFullTimeDentalEmployee: false,
  agreesForNomineeInformationToBeMarketed: false,
  country: null,
  nominee: { value: "0", label: "Myself" },
  firstName: "",
  lastName: "",
  addressLine: "",
  email: "",
  nomineeFirstName: "",
  nomineeLastName: "",
  nomineeAddressLine: "",
  nomineeEmail: "",
  isCertifiedHygienist: false,
  graduation: { value: 0, label: "" },
  referal: refereeOptionsWDHA[0],
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
      try {
        const parsed = JSON.parse(stored);

        // Migrate referal if it's present but not a valid referee option
        try {
          const savedReferal = parsed.referal;
          let savedValue: string | null = null;
          if (savedReferal == null) {
            savedValue = null;
          } else if (typeof savedReferal === "string") {
            savedValue = savedReferal;
          } else if (typeof savedReferal === "object") {
            savedValue = savedReferal.value ?? null;
          }

          const matched = refereeOptionsWDHA.find((opt) => opt.value === savedValue);
          if (!matched) {
            parsed.referal = refereeOptionsWDHA[0];
          }
        } catch {
          // If unexpected shape, fallback to default but preserve other fields
          parsed.referal = refereeOptionsWDHA[0];
        }

        setFormData(parsed);
      } catch {
        // Malformed JSON: ignore and keep defaults
      }
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
