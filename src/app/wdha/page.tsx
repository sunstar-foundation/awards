"use client";
import React, { useState } from "react";
import { Checkbox } from "../components/checkbox";
import { DropdownList } from "../components/dropdown-list";
import { RadioGroup } from "../components/radio";
import { Input } from "../components/input";
import { Textarea } from "../components/textarea";
import { Button } from "../components/button";
import { Container } from "../components/container";

export default function Home() {
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return (
    <Container>
      <H1>World Dental Hygienist Awards Application</H1>
      <Checkbox
        label="I am not a full-time employee of a dental products distributor or manufacturer which market products compete with SUNSTAR's product line."
        checked={checked}
        onChange={handleCheckboxChange}
      />
      {checked && <NomineeSection />}
    </Container>
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
  const nomineeOptions = [
    { value: "0", label: "Myself" },
    { value: "1", label: "A colleague" },
  ];
  const [selectedValue, setSelectedValue] = useState(nomineeOptions[0]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [email, setEmail] = useState("");

  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = nomineeOptions.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      setSelectedValue(selectedOption);
    }
  };

  return (
    <>
      <DropdownList
        label="Please select the country of residence for your nomination"
        onChange={() => {}}
        options={[
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" },
          { value: "au", label: "Australia" },
        ]}
      />
      <RadioGroup
        label="Are you nominating yourself or a colleague?"
        options={nomineeOptions}
        selectedValue={selectedValue.value}
        onChange={handleRadioChange}
      />

      <Input
        label="First name *"
        name="firstName"
        required={true}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        placeholder="Enter first name"
      />

      <Input
        label="Last name *"
        name="lastName"
        required={true}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        placeholder="Enter last name"
      />

      <Input
        label="Address line *"
        name="addressLine"
        required={true}
        value={addressLine}
        onChange={(e) => setAddressLine(e.target.value)}
        type="text"
        placeholder="Enter address line 1"
      />
      <Input
        label="Email address *"
        name="email"
        required={true}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />

      <Checkbox
        label="I confirm that I am a certified Dental Hygienist."
        checked={checked}
        onChange={handleCheckboxChange}
      />

      <NomineeSchoolSection />
      <NomineeReferenceSection />
      <NomineeCategorySection />
      <Button>Next Step</Button>
    </>
  );
}

function NomineeSchoolSection() {
  const gratuedFromSchoolOptions = [
    { value: "0", label: "Less than 5 years" },
    { value: "1", label: "5-10 years" },
    { value: "2", label: "10-15 years" },
    { value: "3", label: "15-25 years" },
    { value: "4", label: "Over 25 years" },
  ];

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
  const refferOptions = [
    { value: "0", label: "IFDH website" },
    { value: "1", label: "IFDH social media" },
    { value: "2", label: "SUNSTAR/SUNSTAR Foundation website" },
    { value: "3", label: "SUNSTAR/SUNSTAR Foundation social media" },
    { value: "4", label: "Colleagues" },
    { value: "5", label: "Other" },
  ];

  const [selectedReffer, setSelectedReffer] = useState(refferOptions[0]);
  const handleRefferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = refferOptions.find(
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
        options={refferOptions}
        selectedValue={selectedReffer.value}
        onChange={handleRefferChange}
      />
    </>
  );
}

function NomineeCategorySection() {
  const nomineeCategories = [
    { value: "public_health", label: "Public Health" },
    { value: "full_time_clinician", label: "Full Time Clinician" },
    { value: "academia", label: "Academia" },
    { value: "entrepreneur", label: "Entrepreneur" },
    { value: "new_rdh", label: "New RDH" },
    { value: "research", label: "Research" },
  ];
  const [selectedNomineeCategory, setSelectedNomineeCategory] = useState(
    nomineeCategories[0]
  );

  const handleNomineeCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedOption = nomineeCategories.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      setSelectedNomineeCategory(selectedOption);
    }
  };

  const categoryQuestionMap: {
    [key: string]: {
      label: string;
      fields: {
        id: string;
        type: "text" | "textarea" | "number";
        label: string;
        name: string;
        value?: string;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
        placeholder?: string;
        required?: boolean;
      }[];
    };
  } = {
    public_health: {
      label: "Public Health",
      fields: [
        {
          id: "impact_description",
          type: "textarea",
          label: "How has the nominee improved public dental health?",
          onChange: () => {},
          name: "impact_description",
          required: true,
        },
        {
          id: "program_name",
          type: "text",
          name: "program_name",
          label: "Name of the community program",
          placeholder: "e.g. SmileBright Initiative",
        },
      ],
    },
    full_time_clinician: {
      label: "Full Time Clinician",
      fields: [
        {
          id: "hours_worked",
          type: "number",
          name: "hours_worked",
          placeholder: "e.g. 40",
          label: "How many hours per week do they work?",
          required: true,
        },
        {
          id: "patient_types",
          name: "patient_types",
          placeholder: "e.g. children, elderly, etc.",
          type: "textarea",
          label: "Describe the patient types they care for.",
        },
      ],
    },
    academia: {
      label: "Academia",
      fields: [
        {
          id: "teaching_impact",
          type: "textarea",
          name: "teaching_impact",
          placeholder: "e.g. 5 years",
          label: "How has the nominee impacted students?",
          required: true,
        },
        {
          id: "research_contribution",
          type: "textarea",
          name: "research_contribution",
          placeholder: "e.g. 10 publications",
          label: "Describe their research contributions.",
        },
      ],
    },
    entrepreneur: {
      label: "Entrepreneur",
      fields: [
        {
          id: "business_description",
          type: "textarea",
          name: "business_description",
          placeholder: "e.g. dental startup",
          label: "Describe the nominee's business.",
          required: true,
        },
        {
          id: "innovation_impact",
          type: "textarea",
          name: "innovation_impact",
          placeholder: "e.g. 3 patents",
          label: "How has their innovation impacted the field?",
        },
      ],
    },
    new_rdh: {
      label: "New RDH",
      fields: [
        {
          id: "first_year_practice",
          type: "number",
          name: "first_year_practice",
          placeholder: "e.g. 2023",
          label: "How many years have they been practicing?",
          required: true,
        },
        {
          id: "career_goals",
          type: "textarea",
          name: "career_goals",
          placeholder: "e.g. become a dental hygienist educator",
          label: "Describe their career goals.",
        },
      ],
    },
    research: {
      label: "Research",
      fields: [
        {
          id: "research_topic",
          type: "text",
          name: "research_topic",
          placeholder: "e.g. oral health and systemic diseases",
          label: "What is the nominee's research topic?",
          required: true,
        },
        {
          id: "research_impact",
          type: "textarea",
          name: "research_impact",
          placeholder: "e.g. 20 publications",
          label: "How has their research impacted the field?",
        },
      ],
    },
  };

  return (
    <>
      <RadioGroup
        label="Nominee category *"
        options={nomineeCategories}
        selectedValue={selectedNomineeCategory.value}
        onChange={handleNomineeCategoryChange}
      />

      {selectedNomineeCategory && (
        <div className="flex flex-col gap-4 w-full">
          {categoryQuestionMap[selectedNomineeCategory.value]?.fields.map(
            (field) => {
              if (field.type === "textarea") {
                return (
                  <Textarea
                    label={`${field.label} *`}
                    value={field.value || ""}
                    key={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    rows={4}
                  />
                );
              } else {
                return (
                  <Input
                    label={`${field.label} *`}
                    value={field.value || ""}
                    key={field.id}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                  />
                );
              }
            }
          )}
        </div>
      )}
    </>
  );
}
