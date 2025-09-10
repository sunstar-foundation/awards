"use client";
import React, { useState } from "react";
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
  refereeOptionsWDHA,
} from "@/data/data";
import { ErrorText, H1, Link } from "../components/typography";
import { useFormFieldActions } from "./wdha.hooks";
import { useSendEmail } from "@/lib/api/client/send-email.api";
import Image from "next/image";

export default function Home() {
  const { formData, updateField, steps } = useFormContext();

  return (
    <Container>
      {steps === 2 ? (
        <LastStepSection />
      ) : (
        <>
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
              <Checkbox
                name="agrees_for_nominee_information_to_be_marketed"
                label="I agree for Sunstar affiliates and distributors to use my details for marketing purposes."
                checked={formData.agreesForNomineeInformationToBeMarketed}
                onChange={(e) =>
                  updateField(
                    "agreesForNomineeInformationToBeMarketed",
                    e.target.checked
                  )
                }
              />
              {formData.isNotFullTimeDentalEmployee && <CountrySection />}
            </>
          )}

          {steps === 1 && <SummarySection />}
        </>
      )}
    </Container>
  );
}

function LastStepSection() {
  const { formData } = useFormContext();
  return (
    <div className="flex flex-col gap-4 w-full items-start">
      <Image
        src="/check.svg"
        alt="Thank you"
        width={84}
        height={84}
        className="mx-auto mb-4"
      />
      <H1>Congratulations, your nomination has been sent successfully!</H1>
      <p>We will get back to you and provide you the next steps.</p>
      <p>
        In the meantime please use the following button to upload your 1-minute
        video.
      </p>
      <p>
        For some tips and tricks that can really make your video stand out,
        please go to this page:{" "}
        <Link href="https://www.sunstar-foundation.org/en/awards/world-hygienist/how-to-apply#recording-a-video-with-your-phone">
          How to upload a video
        </Link>
      </p>
      <section className="flex flex-col gap-2 mt-4">
        <Button
          onClick={
            //navigate to share video page
            () => {
              window.location.href =
                "/share-video?submissionId=" +
                formData.uniqueId +
                "&firstName=" +
                formData.firstName +
                "&lastName=" +
                formData.lastName +
                "&email=" +
                formData.email;
            }
          }
        >
          Upload my video
        </Button>
      </section>
    </div>
  );
}

function SummarySection() {
  const { formData, updateField, setSteps } = useFormContext();
  const { sendEmail, pending } = useSendEmail();

  const [error, setError] = useState<string | null>(null);
  async function handleSendEmail() {
    if (formData.acceptedPrivacyPolicy) {
      const { error, message } = await sendEmail({
        ...formData,
        type: "WDHA",
      });

      if (error) {
        setError(message);
      } else {
        setSteps(2);
      }
    } else {
      setError("Please accept the privacy policy to proceed.");
    }
  }

  return (
    <>
      {error && <ErrorText>{error}</ErrorText>}
      <p className="text-xl text-bluecolor">
        Please review and ensure the below information is correct before ticking
        the privacy policy box and sending the application.
      </p>
      <section className="flex flex-col gap-2">
        <Label label="I agree for Sunstar affiliates and distributors to use my details for marketing purposes." />
        <p className="text-pretty text-lg">
          {formData.agreesForNomineeInformationToBeMarketed ? "Yes" : "No"}
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <Label label="Country of residence" />
        <p className="text-pretty text-lg">{formData.country?.label}</p>
      </section>
      <section className="flex flex-col gap-2">
        <Label label={"Your Information"} />
        <p className="text-pretty text-lg">
          {formData.firstName} {formData.lastName}
          <br></br>
          {formData.addressLine}
          <br></br>
          {formData.email}
        </p>
      </section>

      {formData.nominee.value === "1" && (
        <section className="flex flex-col gap-2">
          <Label label={"Your colleague's Information"} />
          <p className="text-pretty text-lg">
            {formData.nomineeFirstName} {formData.nomineeLastName}
            <br></br>
            {formData.nomineeAddressLine}
            <br></br>
            {formData.nomineeEmail}
          </p>
        </section>
      )}

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
      <section className="flex flex-col gap-2">
        <Label label="How has the nominee assisted individual lives in the chosen category?" />
        <p className="text-pretty text-lg">
          {formData.howDidTheNomineeAssistedIndividualLives}
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <Label label="How has the nominee made a positive impact in the chosen category?" />
        <p className="text-pretty text-lg">
          {formData.howDidTheNomineeMadePositiveImpact}
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <Label label="What has been the nominee's greatest achievement in the chosen category?" />
        <p className="text-pretty text-lg">
          {formData.whatHasBeenTheNomineeGreatestAchievement}
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <Label label="What is the nominee most proud of in the chosen category?" />
        <p className="text-pretty text-lg">
          {formData.whatIsTheNomineeMostProudOf}
        </p>
      </section>
      <p>
        <span className="opacity-65">
          By clicking on the 'Send' button, you consent that Sunstar collects
          and stores the data provided in this form. For more information about
          our privacy policy, please visit the following
        </span>{" "}
        <Link href="https://www.sunstar-foundation.org/en/privacy">
          privacy page
        </Link>
        .
      </p>
      <Checkbox
        name="privacy_policy"
        label="I have read and understood the privacy policy"
        checked={formData.acceptedPrivacyPolicy}
        onChange={(e) => updateField("acceptedPrivacyPolicy", e.target.checked)}
      />
      <section className="flex flex-col gap-2 sm:flex-row sm:justify-between w-full">
        <Button
          onClick={() => setSteps(0)}
          variant="secondary"
          disabled={pending}
        >
          Edit
        </Button>
        <Button
          onClick={handleSendEmail}
          disabled={!formData.acceptedPrivacyPolicy || pending}
          className="wdha-button"
        >
          {pending ? "Sending..." : "Send"}
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
          .country.edhf === true || formData.country.wdha === true ? (
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
              href={`${process.env.NEXT_PUBLIC_DOMAIN}/gum-edhf-award-of-distinction`}
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
        label={formData.nominee.value === "0" ? "First name" : "Your first name"}
        name="firstName"
        required={true}
        value={formData.firstName}
        onChange={(e) => updateField("firstName", e.target.value)}
        type="text"
        placeholder="Enter first name"
      />

      <Input
        label={formData.nominee.value === "0" ? "Last name" : "Your last name"}
        name="lastName"
        required={true}
        value={formData.lastName}
        onChange={(e) => updateField("lastName", e.target.value)}
        type="text"
        placeholder="Enter last name"
      />

      <Input
        label={formData.nominee.value === "0" ? "Address line" : "Your address line"}
        name="addressLine"
        required={true}
        value={formData.addressLine}
        onChange={(e) => updateField("addressLine", e.target.value)}
        type="text"
        placeholder="Ex: Route de Pallatex 11, 1163 Etoy"
        note="Enter your full address line, including street address, city, and zip code."
      />
      <Input
        label={formData.nominee.value === "0" ? "Email address" : "Your email address"}
        name="email"
        required={true}
        type="email"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        placeholder="Enter email address"
      />

      {formData.nominee.value === "1" && (
        <>
        <h2 className="text-lg font-medium text-gray-700 text-pretty mt-4">
          Please provide your colleague's information below:
        </h2>
          <Input
            label="Nominee's first name"
            name="nomineeFirstName"
            required={true}
            value={formData.nomineeFirstName!!}
            onChange={(e) => updateField("nomineeFirstName", e.target.value)}
            type="text"
            placeholder="Enter nominee's first name"
          />

          <Input
            label="Nominee's last name"
            name="nomineeLastName"
            required={true}
            value={formData.nomineeLastName!!}
            onChange={(e) => updateField("nomineeLastName", e.target.value)}
            type="text"
            placeholder="Enter nominee's last name"
          />

          <Input
            label="Nominee's address line"
            name="nomineeAddressLine"
            required={true}
            value={formData.nomineeAddressLine!!}
            onChange={(e) => updateField("nomineeAddressLine", e.target.value)}
            type="text"
            placeholder="Ex: Route de Pallatex 11, 1163 Etoy"
            note="Enter the nominee's full address line, including street address, city, and zip code."
          />

          <Input
            label="Nominee's email address"
            name="nomineeEmail"
            required={true}
            type="email"
            value={formData.nomineeEmail!!}
            onChange={(e) => updateField("nomineeEmail", e.target.value)}
            placeholder="Enter nominee's email address"
          />
        </>
      )}

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
        options={refereeOptionsWDHA}
        selectedValue={formData.referal?.value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedOption = refereeOptionsWDHA.find(
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
