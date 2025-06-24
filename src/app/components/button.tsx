import { cva, VariantProps } from "class-variance-authority";
import { cn } from "./components.utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  children: React.ReactNode | React.ReactNode[] | string;
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: VariantProps<typeof buttonStyles>["variant"];
}

const buttonStyles = cva(
  "px-5 py-3 min-w-[150px] cursor-pointer border disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 text-lg font-semibold",
  {
    variants: {
      variant: {
        primary: "bg-bluecolor hover:opacity-90 text-white border-bluecolor",
        secondary: "bg-white hover:bg-gray-100 text-foreground border-gray-300",
      },
      size: {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant,
  size,
  ...props
}: ButtonProps) {
  console.log(buttonStyles({ variant, size }));
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className={cn(buttonStyles({ variant, size }), props.className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
