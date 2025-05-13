"use client";

import { useFormContext } from "./wdha.context";

export function useFormFieldActions<T>() {
  const { formData, updateField } = useFormContext();

  const isDisabled =
    formData.nominee?.value === "" ||
    !formData.nominee ||
    !formData.country ||
    !formData.graduation ||
    !formData.category ||
    !formData.referal ||
    !formData.firstName ||
    !formData.lastName ||
    !formData.addressLine ||
    !formData.email ||
    !formData.howDidTheNomineeAssistedIndividualLives ||
    !formData.howDidTheNomineeMadePositiveImpact ||
    !formData.whatHasBeenTheNomineeGreatestAchievement ||
    !formData.whatIsTheNomineeMostProudOf ||
    (formData.country?.edhf && formData.isNotFullTimeDentalEmployee);

  return {
    isDisabled,
  };
}
