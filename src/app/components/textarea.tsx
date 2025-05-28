import { countWords } from "@/helpers/form-validation";
import { Label } from "./input";
import { useEffect, useState } from "react";

export function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  min = 0,
  max = 1000,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  min?: number;
  max?: number;
  required?: boolean;
}) {
  const id = `textarea-${name.replace(/\s+/g, "-").toLowerCase()}`;
  //calc rows based on min and max
  const calculatedRows = Math.ceil((max - min) / 20); // Assuming 10 characters per row
  const adjustedRows = Math.max(rows, calculatedRows); // Ensure at least the default rows

  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    const wordCount = countWords(value);
    setIsInvalid(wordCount < min || wordCount > max);
  }, [value, min, max]);

  return (
    <div className="flex flex-col gap-2 w-full items-start">
      <Label label={label} required={required} />
      <div className="flex flex-col gap-2 w-full items-start ">
        <div className="relative w-full">
          <textarea
            className={`border bg-lightgray focus:bg-white py-2 px-3 w-full resize-none ${
              isInvalid
                ? "border-red-500 focus:border-red-500"
                : "focus:border-gray-300 border-transparent "
            }`}
            value={value}
            id={id}
            name={name}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={adjustedRows}
            maxLength={countWords(value) >= max ? max : undefined}
          />
          <span className="text-sm text-gray-700 absolute right-6 bottom-3 bg-white px-1.5 rounded">
            {countWords(value)} / {max} words
          </span>
        </div>
        <p className="text-sm text-gray-500">
          This question requires {min} words minimum to {max} words maximum.
        </p>
      </div>
    </div>
  );
}
