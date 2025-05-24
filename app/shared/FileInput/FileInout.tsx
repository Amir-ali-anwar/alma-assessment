import React from "react";
import { Controller } from "react-hook-form";
import InputStyles from '../Input.module.scss'

interface FileInputProps {
  name: string;
  control: any;
  error?: string;
  label: string;
}

const FileInput: React.FC<FileInputProps> = ({ name, control, error, label }) => (
  <div className="input--file">
    <label>{label}</label>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => onChange(e.target.files)} />
      )}
    />
    {error && <p className={`${InputStyles["input-error"]}`}>{error}</p>}
  </div>
);

export default FileInput;
