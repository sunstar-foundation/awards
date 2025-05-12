export function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode | React.ReactNode[] | string;
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-white bg-bluecolor hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[150px] cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}
