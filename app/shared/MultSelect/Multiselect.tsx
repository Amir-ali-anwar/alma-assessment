import React from "react";
import InputStyles from "../Input.module.scss";
import { Controller, Control, FieldPath } from "react-hook-form";
import { LeadFormData } from "@/app/(public)/lead-form/page";

interface MultiSelectProps {
  name: FieldPath<LeadFormData>;
  control: Control<LeadFormData>;
  options: string[];
  label: string;
  error?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  control,
  options,
  error,
}) => (
  <div
    className={`${InputStyles["input-checkboxes"]} ${
      error ? InputStyles["error"] : ""
    }`}
  >
    {/* <label>{label}</label> */}
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onChange = field.onChange;
        const value: string[] = Array.isArray(field.value)
          ? field.value
          : typeof field.value === "string"
          ? [field.value]
          : [];

        const handleCheckboxChange = (option: string) => {
          if (value.includes(option)) {
            onChange(value.filter((v) => v !== option));
          } else {
            onChange([...value, option]);
          }
        };

        return (
          <>
            {options.map((opt) => (
              <label key={opt} className={InputStyles["custom-checkbox-label"]}>
                <input
                  type="checkbox"
                  value={opt}
                  checked={value.includes(opt)}
                  onChange={() => handleCheckboxChange(opt)}
                  className={InputStyles["custom-checkbox-input"]}
                />
                <span className={InputStyles["custom-checkbox-box"]}>
                  {value.includes(opt) && (
                    <svg
                      viewBox="0 0 24 24"
                      className="custom-checkbox-checkmark"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 6L9 17l-5-5" stroke="none" fill="white" />
                    </svg>
                  )}
                </span>
                {opt}
              </label>
            ))}
          </>
        );
      }}
    />
    {error && <p className={InputStyles["input-error"]}>{error}</p>}
  </div>
);

export default MultiSelect;
