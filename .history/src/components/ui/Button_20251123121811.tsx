import React from "react";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  onClick,
  leftIcon,
  rightIcon,
  className = "",
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-quicksand font-semibold rounded-lg transition-all duration-200 focus:outline-none";

  const variants = {
  primary:
    "bg-[#1C65DA] text-white hover:bg-[#1550A3] dark:bg-[#1C65DA] dark:hover:bg-[#1550A3]",
  secondary:
    "bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
  outline:
    "border border-[#1C65DA] text-[#1C65DA] hover:bg-[#E6F0FF] dark:border-[#1C65DA] dark:text-[#1C65DA] dark:hover:bg-[#1550A3]",
  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
};

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyle,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
