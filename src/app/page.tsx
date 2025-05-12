"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "./components/checkbox";
import { DropdownList } from "./components/dropdown-list";
import { RadioGroup } from "./components/radio";
import { Input } from "./components/input";

export default function Home() {
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[30px] row-start-2 items-center sm:items-start w-full max-w-[560px]">
        <H1>World Dental Hygienist Awards Application</H1>
        <Checkbox
          label="I am not a full-time employee of a dental products distributor or manufacturer which market products compete with SUNSTAR's product line."
          checked={checked}
          onChange={handleCheckboxChange}
        />
        {checked && <NomineeSection />}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
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
  const [inputValue, setInputValue] = useState("");

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = nomineeOptions.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      setSelectedValue(selectedOption);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Enter first name"
      />
    </>
  );
}
