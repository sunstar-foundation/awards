"use client";

import { useFormContext } from "./wdha.context";
import { countWords, isValidEmail, isValidFirstNameOrLastName } from "@/helpers/form-validation";

export function useFormFieldActions() {
  const { formData } = useFormContext();

  const invalidFirstname = !isValidFirstNameOrLastName(formData.firstName);
  const invalidNomineeFirstname = formData.nominee.value === "1" && !isValidFirstNameOrLastName(formData.nomineeFirstName!!);
  const invalidLastname = !isValidFirstNameOrLastName(formData.lastName);
  const invalidNomineeLastname = formData.nominee.value === "1" && !isValidFirstNameOrLastName(formData.nomineeLastName!!);
  const invalidEmail = !isValidEmail(formData.email);
  const invalidNomineeEmail = formData.nominee.value === "1" && !isValidEmail(formData.nomineeEmail!!);

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
    formData.nominee.value === "1" ? formData.nomineeFirstName : "filled",
    formData.nominee.value === "1" ? formData.nomineeLastName : "filled",
    formData.nominee.value === "1" ? formData.nomineeAddressLine : "filled",
    formData.nominee.value === "1" ? formData.nomineeEmail : "filled",
  ];



  const isValidhowDidTheNomineeAssistedIndividualLives = (() => {
    const count = countWords(formData.howDidTheNomineeAssistedIndividualLives);
    return count >= 150 && count <= 350;
  })();

  const isValidhowDidTheNomineeMadePositiveImpact = (() => {
    const count = countWords(formData.howDidTheNomineeMadePositiveImpact);
    return count >= 150 && count <= 350;
  })();

  const isValidwhatHasBeenTheNomineeGreatestAchievement = (() => {
    const count = countWords(formData.whatHasBeenTheNomineeGreatestAchievement);
    return count >= 150 && count <= 350;
  })();

  const isValidwhatIsTheNomineeMostProudOf = (() => {
    const count = countWords(formData.whatIsTheNomineeMostProudOf);
    return count >= 150 && count <= 350;
  })();

  const isDisabled =
    requiredFields.some((field) => !field || field === "") ||
    invalidFirstname ||
    invalidLastname ||
    invalidEmail ||
    (formData.country?.edhf && formData.isNotFullTimeDentalEmployee) ||
    !formData.agreesForNomineeInformationToBeMarketed ||
    !isValidhowDidTheNomineeAssistedIndividualLives ||
    !isValidhowDidTheNomineeMadePositiveImpact ||
    !isValidwhatHasBeenTheNomineeGreatestAchievement ||
    !isValidwhatIsTheNomineeMostProudOf ||
    (formData.nominee.value === "1" && (invalidNomineeFirstname || invalidNomineeLastname || invalidNomineeEmail));

  return {
    isDisabled,
  };
}
