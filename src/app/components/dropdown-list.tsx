import { Label } from "./input";

export function DropdownList({
  label,
  onChange,
  options,
  value,
  required = false,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  value: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label label={label} required={required} />}
      <select
        id="dropdown"
        className="block w-full p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
