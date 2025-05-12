export function DropdownList({
  label,
  onChange,
  options,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor="dropdown" className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id="dropdown"
        className="block w-full p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
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
