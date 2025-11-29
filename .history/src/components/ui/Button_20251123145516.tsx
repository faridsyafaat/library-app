import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "short";
}

const Button: React.FC<ButtonProps> = ({ variant = "default", className, ...props }) => {
  const baseStyle = "font-medium focus:outline-none transition-colors";

  const variants = {
    default: "px-6 py-2 rounded-lg bg-[#1C65DA] text-white",
    outline: "px-6 py-2 rounded-lg border border-white text-white",
    short: "px-4 py-1 rounded-md text-sm",
  };

  return <button className={clsx(baseStyle, variants[variant], className)} {...props} />;
};

export default Button;
