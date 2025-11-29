import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "short";
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium focus:outline-none rounded-full disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<string, string> = {
    default: "bg-[#1C65DA] text-white px-6 py-2 hover:bg-blue-600",
    outline: "border border-gray-800 text-black bg-white px-6 py-2 hover:bg-gray-100",
    short: "px-4 py-2 rounded-md text-sm",
  };

  return (
    <button className={clsx(baseStyle, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
