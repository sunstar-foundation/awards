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
  const calculatedRows = Math.ceil((max - min) / 30); // Assuming 10 characters per row
  const adjustedRows = Math.max(rows, calculatedRows); // Ensure at least the default rows
  return (
    <div className="flex flex-col gap-2 w-full items-start">
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col gap-2 w-full items-start">
        <textarea
          className="border border-gray-300 py-2 px-3 w-full resize-none"
          value={value}
          id={id}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={adjustedRows}
          minLength={min}
          maxLength={max}
        />
        <p className="text-sm text-gray-500">
          This question requires {min} words minimum to {max} words maximum.
        </p>
      </div>
    </div>
  );
}
