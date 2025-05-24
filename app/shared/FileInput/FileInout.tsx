import React from "react";
import { Controller, Control, FieldPath } from "react-hook-form";
import InputStyles from '../Input.module.scss'
import { LeadFormData } from "@/app/(public)/lead-form/page";
interface FileInputProps {
  name: FieldPath<LeadFormData>;
  control: Control<LeadFormData>;
  error?: string;
  label: string;
}
const FileInput: React.FC<FileInputProps> = ({ name, control, error, label }) => (
  <div  className={`${InputStyles['input--file']} ${error ? InputStyles['error'] : ''}`}>
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
