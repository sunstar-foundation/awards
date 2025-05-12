export function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const id = `textarea-${name.replace(/\s+/g, "-").toLowerCase()}`; // Generate a unique ID for the textarea
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="border border-gray-300 p-2 w-full"
        value={value}
        id={id}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}
