import React from "react";
import { Controller } from "react-hook-form";

interface FileInputProps {
  name: string;
  control: any;
  error?: string;
  label: string;
}

const FileInput: React.FC<FileInputProps> = ({ name, control, error, label }) => (
  <div>
    <label>{label}</label>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => onChange(e.target.files)} />
      )}
    />
    {error && <p>{error}</p>}
  </div>
);

export default FileInput;
