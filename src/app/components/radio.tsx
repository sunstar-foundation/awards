export function RadioGroup({
  label,
  options,
  selectedValue,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <section className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-gray-700">{label}</legend>
      {options.map((option) => (
        <RadioBox
          key={option.value}
          value={option.value}
          label={option.label}
          checked={selectedValue === option.value}
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
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex gap-2 items-center cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
}
