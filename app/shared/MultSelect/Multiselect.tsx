import React from "react";
import { Controller } from "react-hook-form";

interface MultiSelectProps {
  name: string;
  control: any;
  options: string[];
  label: string;
  error?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ name, control, options, label, error }) => (
  <div>
    <label>{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select multiple {...field}>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}
    />
    {error && <p>{error}</p>}
  </div>
);

export default MultiSelect;
