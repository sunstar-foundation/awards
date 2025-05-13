export function Checkbox({
  label,
  checked,
  onChange,
  name,
}: {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) {
  return (
    <label className="flex gap-3 cursor-pointer items-start">
      <input
        id={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1 flex-shrink-0 flex-grow"
      />
      <span className="text-gray-700 text-pretty">{label}</span>
    </label>
  );
}
