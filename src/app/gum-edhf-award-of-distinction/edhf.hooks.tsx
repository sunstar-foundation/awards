"use client";

import { Console } from "console";
import { useFormContextEDHF } from "./edhf.context";
import { countWords, isValidEmail } from "@/helpers/form-validation";

export function useFormFieldActions() {
  const { formData } = useFormContextEDHF();

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
    (!formData.country?.edhf && formData.isNotFullTimeDentalEmployee) ||
    !formData.agreesForNomineeInformationToBeMarketed ||
    !isValidhowDidTheNomineeAssistedIndividualLives ||
    !isValidhowDidTheNomineeMadePositiveImpact ||
    !isValidwhatHasBeenTheNomineeGreatestAchievement ||
    !isValidwhatIsTheNomineeMostProudOf;

  return {
    isDisabled,
  };
}
