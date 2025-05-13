import { Label } from "./input";

export function RadioGroup({
  label,
  options,
  selectedValue,
  onChange,
  required = false,
}: {
  label: string;
  options: { value: string; label: string; description?: string }[];
  selectedValue: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <section className="flex flex-col gap-2">
      <Label label={label} required={required} />
      {options.map((option) => (
        <RadioBox
          key={option.value}
          value={option.value}
          label={option.label}
          checked={selectedValue === option.value}
          description={option.description}
          onChange={onChange}
        />
      ))}
    </section>
  );
}

export function RadioBox({
  label,
  value,
  checked,
  onChange,
  description,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
}) {
  return (
    <label className="flex gap-2 items-start cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0 mt-1"
      />
      <span
        className={`${
          checked ? "text-gray-900" : "text-gray-700"
        } flex flex-col gap-0.5 items-start`}
      >
        <p>{label}</p>
        {description && <p className="text-sm">{description}</p>}
      </span>
    </label>
  );
}
