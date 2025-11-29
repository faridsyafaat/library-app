import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "short";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = "default", className, children, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "px-6 py-2 rounded-full bg-[#1C65DA] text-white hover:bg-[#1553a0]",
    outline: "px-6 py-2 rounded-full border border-white text-white hover:bg-gray-100",
    short: "px-4 py-1 rounded-md text-sm",
  };

  return (
    <button className={clsx(baseStyle, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
