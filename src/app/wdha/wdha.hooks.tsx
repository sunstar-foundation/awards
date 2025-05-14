"use client";

import { useFormContext } from "./wdha.context";
import { isValidEmail } from "@/helpers/form-validation";

export function useFormFieldActions() {
  const { formData } = useFormContext();

  const invalidFirstname =
    !formData.firstName ||
    formData.firstName.trim().length < 2 ||
    formData.firstName.trim().length > 50 ||
    /\d/.test(formData.firstName) ||
    !/^[a-zA-ZÀ-ÿ' -]+$/.test(formData.firstName);

  const invalidLastname =
    !formData.lastName ||
    formData.lastName.trim().length < 2 ||
    formData.lastName.trim().length > 50 ||
    /\d/.test(formData.lastName) ||
    !/^[a-zA-ZÀ-ÿ' -]+$/.test(formData.lastName);

  const invalidEmail = !isValidEmail(formData.email);

  const requiredFields = [
    formData.nominee?.value,
    formData.country,
    formData.graduation,
    formData.category,
    formData.firstName,
    formData.lastName,
    formData.addressLine,
    formData.email,
    formData.howDidTheNomineeAssistedIndividualLives,
    formData.howDidTheNomineeMadePositiveImpact,
    formData.whatHasBeenTheNomineeGreatestAchievement,
    formData.whatIsTheNomineeMostProudOf,
  ];

  const isDisabled =
    requiredFields.some((field) => !field || field === "") ||
    invalidFirstname ||
    invalidLastname ||
    invalidEmail ||
    (formData.country?.edhf && formData.isNotFullTimeDentalEmployee);

  return {
    isDisabled,
  };
}
