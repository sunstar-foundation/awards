"use client";
import React, { useState } from "react";
import { Checkbox } from "../components/checkbox";
import { DropdownList } from "../components/dropdown-list";
import { RadioGroup } from "../components/radio";
import { Input, Label } from "../components/input";
import { Textarea } from "../components/textarea";
import { Button } from "../components/button";
import { Container } from "../components/container";
import { useFormContextEDHF } from "./edhf.context";
import {
  countries,
  gratuedFromSchoolOptions,
  nomineeCategories,
  nomineeOptions,
  refereeOptionsEDHF,
} from "../../data/data";
import { ErrorText, H1, Link } from "../components/typography";
import { useFormFieldActions } from "./edhf.hooks";
import { useSendEmail } from "@/lib/api/client/send-email.api";
import Image from "next/image";
import { EDHF_DEADLINE, isAwardClosed } from "@/config/awards";

const EDHF_APPLICATION_QUESTIONS = {
  individualImpact: {
    title: "1. Individual Impact",
    question:
      "How has the nominee assisted individuals in living a healthier life through their work in the selected category?",
    description:
      "Please describe specific examples of how the nominee has made a meaningful difference in the lives of patients, clients, students, colleagues, or other individuals. Include measurable or long-term outcomes whenever possible.",
  },
  communityImpact: {
    title: "2. Community Impact and Leadership",
    question:
      "How has the nominee made a positive impact on the community of their selected category?",
    description:
      "Describe activities such as outreach, advocacy, volunteer service, mentoring, education, professional leadership, program development, research, or other efforts that benefited a broader population. Include evidence of impact and community influence where possible.",
  },
  clinicalAchievement: {
    title: "3. Signature Achievement in Clinical Work",
    question:
      "When in private practice, what has been the nominee's greatest achievement?",
    description:
      "Describe one accomplishment that best demonstrates the nominee's expertise, innovation, leadership, or contribution to the profession. Explain the challenge addressed, the nominee's role, and the outcomes achieved.",
  },
  professionalExcellence: {
    title: "4. Professional Excellence and Distinction",
    question:
      "Of what accomplishment in the nominee's hygiene career are they most proud?",
    description:
      "Focus on the accomplishment that best reflects the nominee's professional excellence, unique contributions, and commitment to advancing patient care, education, prevention, or the profession. Explain why this achievement is especially meaningful.",
  },
};

const MAX_CV_FILE_SIZE = 10 * 1024 * 1024;
const CV_FILE_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export default function Home() {
  const isFormClosed = isAwardClosed(EDHF_DEADLINE);
  if (isFormClosed) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }

  const { formData, updateField, steps } = useFormContextEDHF();

  return (
    <Container>
      {steps === 2 ? (
        <LastStepSection />
      ) : (
        <>
          <H1>GUM EDHF Award of Distinction - Application form</H1>
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
                    e.target.checked,
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
  const { formData } = useFormContextEDHF();
  return (
    <div className="flex flex-col gap-4 w-full items-start">
      <Image
        src="/check.svg"
        alt="Thank you"
        width={84}
        height={84}
        className="mx-auto mb-4"
      />
      <H1>
        Congratulations,{" "}
        {formData.nominee.value === "1" ? "your colleague's" : "your"}{" "}
        nomination has been sent successfully!
      </H1>
      <p>We will get back to you and provide you the next steps.</p>
    </div>
  );
}

function SummarySection() {
  const { formData, updateField, setSteps } = useFormContextEDHF();
  const { sendEmail, pending } = useSendEmail();
  const [error, setError] = useState<string | null>(null);
  async function handleSendEmail() {
    if (formData.acceptedPrivacyPolicy) {
      const { error, message } = await sendEmail({
        ...formData,
        type: "EDHF",
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
        <Label label={EDHF_APPLICATION_QUESTIONS.individualImpact.title} />
        <p className="text-pretty text-lg">
          {formData.howDidTheNomineeAssistedIndividualLives}
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <Label label={EDHF_APPLICATION_QUESTIONS.communityImpact.title} />
        <p className="text-pretty text-lg">
          {formData.howDidTheNomineeMadePositiveImpact}
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <Label label={EDHF_APPLICATION_QUESTIONS.clinicalAchievement.title} />
        <p className="text-pretty text-lg">
          {formData.whatHasBeenTheNomineeGreatestAchievement}
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <Label
          label={EDHF_APPLICATION_QUESTIONS.professionalExcellence.title}
        />
        <p className="text-pretty text-lg">
          {formData.whatIsTheNomineeMostProudOf}
        </p>
      </section>
      <CvUploadSection />
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
          className="edhf-button"
        >
          {pending ? "Sending..." : "Send"}
        </Button>
      </section>
    </>
  );
}

function readFileAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.split(",")[1] || "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function formatFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function CvUploadSection() {
  const { formData, updateField } = useFormContextEDHF();
  const [cvError, setCvError] = useState<string | null>(null);

  async function handleCvChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setCvError(null);

    if (!file) {
      updateField("cv", null);
      return;
    }

    if (file.size > MAX_CV_FILE_SIZE) {
      updateField("cv", null);
      event.target.value = "";
      setCvError("Please upload a CV smaller than 10 MB.");
      return;
    }

    try {
      const content = await readFileAsBase64(file);
      updateField("cv", {
        fileName: file.name,
        contentType: file.type || "application/octet-stream",
        content,
        size: file.size,
      });
    } catch {
      updateField("cv", null);
      event.target.value = "";
      setCvError("The CV could not be read. Please try uploading it again.");
    }
  }

  return (
    <section className="flex flex-col gap-2 w-full">
      <Label label="Curriculum Vitae (CV)" />
      <div className="flex flex-col gap-2 w-full items-start">
        <input
          type="file"
          accept={CV_FILE_ACCEPT}
          onChange={handleCvChange}
          className="block w-full py-2 px-3 border border-transparent bg-lightgray focus:bg-white focus:border-gray-300"
        />
        <p className="text-sm text-gray-500">
          Optional. Accepted formats: PDF, DOC, DOCX. Maximum file size: 10 MB.
        </p>
        {formData.cv && (
          <p className="text-sm text-gray-700">
            Selected file: {formData.cv.fileName} (
            {formatFileSize(formData.cv.size)})
          </p>
        )}
        {cvError && <ErrorText>{cvError}</ErrorText>}
      </div>
    </section>
  );
}

function CountrySection() {
  const { formData, updateField } = useFormContextEDHF();

  const edhfCountries = countries.filter((country) => country.edhf === true);

  return (
    <>
      <DropdownList
        label="Please select the country of residence for your nomination"
        required={true}
        onChange={(e) => {
          const selectedOption = countries.find(
            (option) => option.value === e.target.value,
          );
          if (selectedOption) {
            updateField("country", selectedOption);
          }
        }}
        value={formData.country?.value || countries[0].value}
        options={[countries[0], ...edhfCountries]}
      />
      {formData.country?.value === "" || !formData.country ? null : formData
          .country.edhf !== true ? null : (
        <NomineeSection />
      )}
    </>
  );
}

function NomineeSection() {
  const { formData, updateField, setSteps } = useFormContextEDHF();
  const { isDisabled } = useFormFieldActions();

  return (
    <>
      <RadioGroup
        label="Are you nominating yourself or a colleague?"
        options={nomineeOptions}
        selectedValue={formData.nominee ? formData.nominee.value : ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedOption = nomineeOptions.find(
            (option) => option.value === e.target.value,
          );
          if (selectedOption) {
            updateField("nominee", selectedOption);
          }
        }}
      />

      <Input
        label={
          formData.nominee.value === "0" ? "First name" : "Your first name"
        }
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
        label={
          formData.nominee.value === "0" ? "Address line" : "Your address line"
        }
        name="addressLine"
        required={true}
        value={formData.addressLine}
        onChange={(e) => updateField("addressLine", e.target.value)}
        type="text"
        placeholder="Ex: Route de Pallatex 11, 1163 Etoy"
        note="Enter your full address line, including street address, city, and zip code."
      />
      <Input
        label={
          formData.nominee.value === "0"
            ? "Email address"
            : "Your email address"
        }
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
  const { formData, updateField } = useFormContextEDHF();
  return (
    <>
      <RadioGroup
        label="How long ago did the nominee graduate from hygiene school?"
        required={true}
        options={gratuedFromSchoolOptions}
        selectedValue={formData.graduation?.value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedOption = gratuedFromSchoolOptions.find(
            (option) => option.value === e.target.value,
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
  const { formData, updateField } = useFormContextEDHF();
  return (
    <>
      <RadioGroup
        label="How did you hear about this award program?"
        options={refereeOptionsEDHF}
        selectedValue={formData.referal?.value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedOption = refereeOptionsEDHF.find(
            (option) => option.value === e.target.value,
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
  const { formData, updateField } = useFormContextEDHF();

  return (
    <>
      <RadioGroup
        label="Nominee category"
        required={true}
        options={nomineeCategories}
        selectedValue={formData.category?.value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedOption = nomineeCategories.find(
            (option) => option.value === e.target.value,
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
  const { formData, updateField } = useFormContextEDHF();

  return (
    <>
      <ApplicationQuestionTextarea
        {...EDHF_APPLICATION_QUESTIONS.individualImpact}
        name="howDidTheNomineeAssistedIndividualLives"
        value={formData.howDidTheNomineeAssistedIndividualLives || ""}
        onChange={(value) =>
          updateField("howDidTheNomineeAssistedIndividualLives", value)
        }
      />

      <ApplicationQuestionTextarea
        {...EDHF_APPLICATION_QUESTIONS.communityImpact}
        name="howDidTheNomineeMadePositiveImpact"
        value={formData.howDidTheNomineeMadePositiveImpact || ""}
        onChange={(value) =>
          updateField("howDidTheNomineeMadePositiveImpact", value)
        }
      />

      <ApplicationQuestionTextarea
        {...EDHF_APPLICATION_QUESTIONS.clinicalAchievement}
        name="whatHasBeenTheNomineeGreatestAchievement"
        value={formData.whatHasBeenTheNomineeGreatestAchievement || ""}
        onChange={(value) =>
          updateField("whatHasBeenTheNomineeGreatestAchievement", value)
        }
      />

      <ApplicationQuestionTextarea
        {...EDHF_APPLICATION_QUESTIONS.professionalExcellence}
        name="whatIsTheNomineeMostProudOf"
        value={formData.whatIsTheNomineeMostProudOf || ""}
        onChange={(value) => updateField("whatIsTheNomineeMostProudOf", value)}
      />
    </>
  );
}

function ApplicationQuestionTextarea({
  title,
  question,
  description,
  name,
  value,
  onChange,
}: {
  title: string;
  question: string;
  description: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="flex flex-col gap-2 w-full">
      <Label label={title} required={true} />
      <p className="text-pretty text-base italic text-gray-700">{question}</p>
      <p className="text-pretty text-sm text-gray-500">{description}</p>
      <Textarea
        label=""
        name={name}
        required={true}
        value={value}
        min={150}
        max={350}
        onChange={onChange}
      />
    </section>
  );
}
