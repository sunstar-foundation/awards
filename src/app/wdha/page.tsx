"use client";
import React, { useState } from "react";
import { Checkbox } from "../components/checkbox";
import { DropdownList } from "../components/dropdown-list";
import { RadioGroup } from "../components/radio";
import { Input } from "../components/input";
import { Textarea } from "../components/textarea";
import { Button } from "../components/button";
import { Container } from "../components/container";
import { useFormContext } from "./wdha.context";
import {
  countries,
  gratuedFromSchoolOptions,
  nomineeCategories,
  nomineeOptions,
  refereeOptions,
} from "./data";

export default function Home() {
  const { formData, updateField } = useFormContext();

  return (
    <Container>
      <H1>World Dental Hygienist Awards Application</H1>
      <Checkbox
        name="full_time_employee"
        label="I am not a full-time employee of a dental products distributor or manufacturer which market products compete with SUNSTAR's product line."
        checked={formData.isNotFullTimeDentalEmployee}
        onChange={(e) =>
          updateField("isNotFullTimeDentalEmployee", e.target.checked)
        }
      />
      {formData.isNotFullTimeDentalEmployee && <CountrySection />}
    </Container>
  );
}

function CountrySection() {
  const { formData, updateField } = useFormContext();

  return (
    <>
      <DropdownList
        label="Please select the country of residence for your nomination"
        onChange={(e) => {
          const selectedOption = countries.find(
            (option) => option.value === e.target.value
          );
          if (selectedOption) {
            updateField("country", selectedOption);
          }
        }}
        value={formData.country?.value || countries[0].value}
        options={countries}
      />
      {formData.country?.value === "" || !formData.country ? null : formData
          .country.edhf === true ? (
        <div className="flex flex-col gap-4 w-full">
          <p>
            You cannot nominate directly for the SUNSTAR World Dental Hygienist
            Awards when your are from <b>{formData.country.label}</b>. Instead,
            please particpate first in your regional SUNSTAR Award of
            Distinction by following the appropriate link:
          </p>
          <section>
            <h2 className="font-bold">North America</h2>
            <a
              href="https://endeavor.swoogo.com/awardofdistinction"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bluecolor underline"
            >
              SUNSTAR Award of Distinction - North America
            </a>
          </section>
          <section>
            <h2 className="font-bold">Europe</h2>

            <a
              href="https://awards.sunstar-foundation.org/award-of-distinction"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bluecolor underline"
            >
              SUNSTAR Award of Distinction - Europe
            </a>
          </section>
        </div>
      ) : (
        <NomineeSection />
      )}
    </>
  );
}

const H1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-4xl sm:text-[42px] font-regular tracking-[-.01em] text-center sm:text-left text-primary">
      {children}
    </h1>
  );
};

function NomineeSection() {
  const { formData, updateField } = useFormContext();

  return (
    <>
      <RadioGroup
        label="Are you nominating yourself or a colleague?"
        options={nomineeOptions}
        selectedValue={formData.nominee.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedOption = nomineeOptions.find(
            (option) => option.value === e.target.value
          );
          if (selectedOption) {
            updateField("nominee", selectedOption);
          }
        }}
      />

      <Input
        label="First name *"
        name="firstName"
        required={true}
        value={formData.firstName}
        onChange={(e) => updateField("firstName", e.target.value)}
        type="text"
        placeholder="Enter first name"
      />

      <Input
        label="Last name *"
        name="lastName"
        required={true}
        value={formData.lastName}
        onChange={(e) => updateField("lastName", e.target.value)}
        type="text"
        placeholder="Enter last name"
      />

      <Input
        label="Address line *"
        name="addressLine"
        required={true}
        value={formData.addressLine}
        onChange={(e) => updateField("addressLine", e.target.value)}
        type="text"
        placeholder="Enter address line 1"
      />
      <Input
        label="Email address *"
        name="email"
        required={true}
        type="email"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        placeholder="Enter email address"
      />

      <Checkbox
        name="certified_hygienist"
        label="I confirm that I am a certified Dental Hygienist."
        checked={formData.isCertifiedHygienist}
        onChange={(e) => updateField("isCertifiedHygienist", e.target.checked)}
      />

      <NomineeSchoolSection />
      <NomineeReferenceSection />
      <NomineeCategorySection />
      <Button>Next Step</Button>
    </>
  );
}

function NomineeSchoolSection() {
  const [selectedSchoolDuration, setSelectedSchoolDuration] = useState(
    gratuedFromSchoolOptions[0]
  );

  const handleSchoolDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedOption = gratuedFromSchoolOptions.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      setSelectedSchoolDuration(selectedOption);
    }
  };

  return (
    <>
      <RadioGroup
        label="How long ago did the nominee graduate from hygiene school? *"
        options={gratuedFromSchoolOptions}
        selectedValue={selectedSchoolDuration.value}
        onChange={handleSchoolDurationChange}
      />
    </>
  );
}

function NomineeReferenceSection() {
  const [selectedReffer, setSelectedReffer] = useState(refereeOptions[0]);
  const handleRefferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = refereeOptions.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      setSelectedReffer(selectedOption);
    }
  };
  return (
    <>
      <RadioGroup
        label="How did you hear about this award program?"
        options={refereeOptions}
        selectedValue={selectedReffer.value}
        onChange={handleRefferChange}
      />
    </>
  );
}

function NomineeCategorySection() {
  const { formData, updateField } = useFormContext();

  return (
    <>
      <RadioGroup
        label="Nominee category *"
        options={nomineeCategories}
        selectedValue={formData.category?.value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedOption = nomineeCategories.find(
            (option) => option.value === e.target.value
          );
          if (selectedOption) {
            updateField("category", selectedOption);
          }
        }}
      />

      {formData.category !== null && <NomineeCategorySectionSelected />}
    </>
  );
}

function NomineeCategorySectionSelected() {
  const { formData, updateField } = useFormContext();

  return (
    <>
      <Textarea
        label="How has the nominee assisted individual lives in the chosen category?"
        name="howDidTheNomineeAssistedIndividualLives"
        required={true}
        value={formData.howDidTheNomineeAssistedIndividualLives || ""}
        min={150}
        max={350}
        onChange={(value) =>
          updateField("howDidTheNomineeAssistedIndividualLives", value)
        }
      />

      <Textarea
        label="How has the nominee made a positive impact in the chosen category?"
        name="howDidTheNomineeMadePositiveImpact"
        required={true}
        value={formData.howDidTheNomineeMadePositiveImpact || ""}
        min={150}
        max={350}
        onChange={(value) =>
          updateField("howDidTheNomineeMadePositiveImpact", value)
        }
      />

      <Textarea
        label="What has been the nominee's greatest achievement in the chosen category?"
        name="whatHasBeenTheNomineeGreatestAchievement"
        required={true}
        value={formData.whatHasBeenTheNomineeGreatestAchievement || ""}
        min={150}
        max={350}
        onChange={(value) =>
          updateField("whatHasBeenTheNomineeGreatestAchievement", value)
        }
      />

      <Textarea
        label="What is the nominee most proud of in the chosen category?"
        name="whatIsTheNomineeMostProudOf"
        required={true}
        value={formData.whatIsTheNomineeMostProudOf || ""}
        min={150}
        max={350}
        onChange={(value) => updateField("whatIsTheNomineeMostProudOf", value)}
      />
    </>
  );
}
