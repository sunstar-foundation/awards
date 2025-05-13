export function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  note,
}: {
  label: string;
  type?: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  note?: string;
}) {
  const id = `input-${name.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label label={label} required={required} />}
      <div className="flex flex-col gap-2 w-full items-start">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="block w-full py-2 px-3 border border-transparent bg-lightgray focus:bg-white focus:border-gray-300"
        />
        {note && <p className="text-sm text-gray-500">{note}</p>}
      </div>
    </div>
  );
}

export function Label({
  label,
  required = false,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <label className="text-base font-medium text-gray-700 text-pretty">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );
}
