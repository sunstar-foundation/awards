export function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const id = `input-${name.replace(/\s+/g, "-").toLowerCase()}`; // Generate a unique ID for the input
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="block w-full p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  );
}
