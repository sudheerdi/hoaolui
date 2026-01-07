import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "whitespace-nowrap cursor-pointer font-semibold rounded-lg transition-all duration-200 flex items-center justify-center";

  const variants = {
    primary: "text-white hover:shadow-xl shadow-lg",
    secondary:
      "bg-green-400 text-white hover:bg-green-500 shadow-lg hover:shadow-xl",
    outline: "border-2 text-white hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const getVariantStyle = () => {
    if (variant === "primary") {
      return { backgroundColor: "#1FA372" };
    }
    if (variant === "outline") {
      return { borderColor: "#1FA372", backgroundColor: "#1FA372" };
    }
    return {};
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${
        sizes[size]
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
      style={getVariantStyle()}
    >
      {children}
    </button>
  );
}
