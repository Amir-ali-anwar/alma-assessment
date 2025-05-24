import React from "react";
import { Controller } from "react-hook-form";
import InputStyles from "../Input.module.scss";

interface MultiSelectProps {
  name: string;
  control: any;
  options: string[];
  label: string;
  error?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  control,
  options,
  label,
  error,
}) => (
  <div className={`${InputStyles["input-checkboxes"]} ${error ? InputStyles['error'] : ''}`}>
    {/* <label>{label}</label> */}
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value = [], onChange } = field;

        const handleCheckboxChange = (option: string) => {
          if (value.includes(option)) {
            onChange(value.filter((v: string) => v !== option));
          } else {
            onChange([...value, option]);
          }
        };

        return (
          <>
            {options.map((opt) => (
              <label key={opt} className={`${InputStyles["custom-checkbox-label"]}`}>
                <input
                  type="checkbox"
                  value={opt}
                  checked={value.includes(opt)}
                  onChange={() => handleCheckboxChange(opt)}
                  className={`${InputStyles['custom-checkbox-input']}`}
                  // className="custom-checkbox-input"
                />
                <span className={`${InputStyles["custom-checkbox-box"]}`}>
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
