import * as React from "react";

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onCheckedChange,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange?.(!checked)}
      className={`w-5 h-5 flex items-center justify-center border rounded 
        transition 
        ${checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"} 
        ${className}`}
    >
      {checked && (
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
};
