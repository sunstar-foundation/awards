export type nomineeType = {
  value: string;
  label: string;
};

export type countryType = {
  value: string;
  label: string;
  edhf: boolean;
  wdha?: boolean;
};

export type graduationType = {
  value: number;
  label: string;
};

export type referalType = {
  value: string;
  label: string;
};

export type categoryType = {
  value: string;
  label: string;
  description: string;
};

export type FormData = {
  uniqueId: string;
  isNotFullTimeDentalEmployee: boolean;
  agreesForNomineeInformationToBeMarketed: boolean;
  country: countryType | null;
  nominee: nomineeType;
  firstName: string;
  lastName: string;
  addressLine: string;
  email: string;
  nomineeFirstName?: string;
  nomineeLastName?: string;
  nomineeAddressLine?: string;
  nomineeEmail?: string;
  isCertifiedHygienist: boolean;
  graduation: graduationType | null;
  referal: referalType | null;
  category: categoryType | null;
  howDidTheNomineeAssistedIndividualLives: string;
  howDidTheNomineeMadePositiveImpact: string;
  whatHasBeenTheNomineeGreatestAchievement: string;
  whatIsTheNomineeMostProudOf: string;
  acceptedPrivacyPolicy: boolean;
};
