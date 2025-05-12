export function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor="input" className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id="input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="block w-full p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  );
}
