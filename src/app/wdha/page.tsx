"use client";
import React from "react";
import { Checkbox } from "../components/checkbox";
import { DropdownList } from "../components/dropdown-list";
import { RadioGroup } from "../components/radio";
import { Input, Label } from "../components/input";
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
import { H1 } from "../components/typography";
import { useFormFieldActions } from "./wdha.hooks";
import { useSendEmail } from "@/lib/api/client/send-email.api";

export default function Home() {
  const { formData, updateField, steps } = useFormContext();

  return (
    <Container>
      <H1>World Dental Hygienist Awards Application</H1>
      {steps === 0 && (
        <>
          <Checkbox
            name="full_time_employee"
            label="I am not a full-time employee of a dental products distributor or manufacturer which market products compete with SUNSTAR's product line."
            checked={formData.isNotFullTimeDentalEmployee}
            onChange={(e) =>
              updateField("isNotFullTimeDentalEmployee", e.target.checked)
            }
          />
          {formData.isNotFullTimeDentalEmployee && <CountrySection />}
        </>
      )}
      {steps === 1 && <SummarySection />}
      {steps === 2 && (
        <div className="flex flex-col gap-4 w-full text-center">
          <p className="text-xl text-bluecolor">
            Thank you for your application! We will review it and get back to
            you soon.
          </p>
          <Button onClick={() => updateField("steps", 0)} variant="secondary">
            Back to home
          </Button>
        </div>
      )}
    </Container>
  );
}

function LastStepSection() {
  const { formData, updateField } = useFormContext();
  return (
    <div className="flex flex-col gap-4 w-full text-center">
      <p className="text-xl text-bluecolor">
        Thank you for your application! We will review it and get back to you
        soon.
      </p>
      <Button onClick={() => updateField("steps", 0)} variant="secondary">
        Back to home
      </Button>
    </div>
  );
}

function SummarySection() {
  const { formData, updateField, setSteps, resetForm } = useFormContext();
  const { sendEmail, pending } = useSendEmail();

  async function handleSendEmail() {
    if (formData.acceptedPrivacyPolicy) {
      const { error, message } = await sendEmail({
        ...formData,
        type: "WDHA",
      });

      if (error) {
        alert("Error sending email. Please try again later.");
      } else {
        setSteps(2);
        resetForm();
      }
    } else {
      alert("Please accept the privacy policy to proceed.");
    }
  }

  return (
    <>
      <p className="text-xl text-bluecolor">
        Please review and ensure the below information is correct before ticking
        the privacy policy box and sending the application.
      </p>
      <section className="flex flex-col gap-2">
        <Label label="Country of residence" />
        <p className="text-pretty text-lg">{formData.country?.label}</p>
      </section>
      <section className="flex flex-col gap-2">
        <Label
          label={
            formData.nominee.value === "0"
              ? "Your Information"
              : "Your colleague information"
          }
        />
        <p className="text-pretty text-lg">
          {formData.firstName} {formData.lastName}
          <br></br>
          {formData.addressLine}
          <br></br>
          {formData.email}
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <Label label="How long ago did the nominee graduate from hygiene school" />
        <p className="text-pretty text-lg">{formData.graduation?.label}</p>
      </section>
      <section className="flex flex-col gap-2">
        <Label label="How did you hear about this award program" />
        <p className="text-pretty text-lg">{formData.referal?.label}</p>
      </section>
      <section className="flex flex-col gap-2">
        <Label label="For which category do you want to nominate yourself or your colleague" />
        <p className="text-pretty text-lg">{formData.category?.label}</p>
      </section>
      <p>
        <span className="opacity-65">
          By clicking on the 'Send' button, you consent that Sunstar collects
          and stores the data provided in this form. For more information about
          our privacy policy, please visit the following
        </span>{" "}
        <a
          href="https://www.sunstar-foundation.org/en/privacy"
          target="_blank"
          className="text-bluecolor underline"
        >
          privacy page
        </a>
        .
      </p>
      <Checkbox
        name="privacy_policy"
        label="I have read and understood the privacy policy"
        checked={formData.acceptedPrivacyPolicy}
        onChange={(e) => updateField("acceptedPrivacyPolicy", e.target.checked)}
      />
      <section className="flex flex-col gap-2 sm:flex-row sm:justify-between w-full">
        <Button onClick={() => setSteps(0)} variant="secondary">
          Edit
        </Button>
        <Button
          onClick={handleSendEmail}
          disabled={!formData.acceptedPrivacyPolicy}
        >
          Send
        </Button>
      </section>
    </>
  );
}

function CountrySection() {
  const { formData, updateField } = useFormContext();

  return (
    <>
      <DropdownList
        label="Please select the country of residence for your nomination"
        required={true}
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

function NomineeSection() {
  const { formData, updateField, setSteps } = useFormContext();
  const { isDisabled } = useFormFieldActions();

  return (
    <>
      <RadioGroup
        label="Are you nominating yourself or a colleague?"
        options={nomineeOptions}
        selectedValue={formData.nominee ? formData.nominee.value : ""}
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
        label="First name"
        name="firstName"
        required={true}
        value={formData.firstName}
        onChange={(e) => updateField("firstName", e.target.value)}
        type="text"
        placeholder=""
      />

      <Input
        label="Last name"
        name="lastName"
        required={true}
        value={formData.lastName}
        onChange={(e) => updateField("lastName", e.target.value)}
        type="text"
        placeholder="Enter last name"
      />

      <Input
        label="Address line"
        name="addressLine"
        required={true}
        value={formData.addressLine}
        onChange={(e) => updateField("addressLine", e.target.value)}
        type="text"
        placeholder="Ex: Route de Pallatex 11, 1163 Etoy"
        note="Enter your full address line, including street address, city, and zip code."
      />
      <Input
        label="Email address"
        name="email"
        required={true}
        type="email"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        placeholder="Enter email address"
      />

      <Checkbox
        name="certified_hygienist"
        label={
          formData.nominee.value === "0"
            ? "I confirm that I am a certified Dental Hygienist."
            : "I confirm that the nominee is a certified Dental Hygienist."
        }
        checked={formData.isCertifiedHygienist}
        onChange={(e) => updateField("isCertifiedHygienist", e.target.checked)}
      />
      {formData.isCertifiedHygienist && (
        <>
          <NomineeSchoolSection />
          <NomineeReferenceSection />
          <NomineeCategorySection />
        </>
      )}
      <Button
        disabled={isDisabled}
        onClick={() => {
          setSteps(1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Apply
      </Button>
    </>
  );
}

function NomineeSchoolSection() {
  const { formData, updateField } = useFormContext();
  return (
    <>
      <RadioGroup
        label="How long ago did the nominee graduate from hygiene school?"
        required={true}
        options={gratuedFromSchoolOptions}
        selectedValue={formData.graduation?.value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedOption = gratuedFromSchoolOptions.find(
            (option) => option.value === e.target.value
          );
          if (selectedOption) {
            updateField("graduation", selectedOption);
          }
        }}
      />
    </>
  );
}

function NomineeReferenceSection() {
  const { formData, updateField } = useFormContext();
  return (
    <>
      <RadioGroup
        label="How did you hear about this award program?"
        options={refereeOptions}
        selectedValue={formData.referal?.value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedOption = refereeOptions.find(
            (option) => option.value === e.target.value
          );
          if (selectedOption) {
            updateField("referal", selectedOption);
          }
        }}
      />
    </>
  );
}

function NomineeCategorySection() {
  const { formData, updateField } = useFormContext();

  return (
    <>
      <RadioGroup
        label="Nominee category"
        required={true}
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
