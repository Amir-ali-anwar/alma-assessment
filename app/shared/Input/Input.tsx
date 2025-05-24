import React from "react";
import InputStyles from '../Input.module.scss'
import { UseFormRegister, FieldPath } from "react-hook-form";
import {LeadFormData} from "@/app/(public)/lead-form/page";
interface TextInputProps {
  label: string;
 name: FieldPath<LeadFormData>;
  register: UseFormRegister<LeadFormData>;
  error?: string;
  type?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  // label,
  name,
  register,
  error,
  type = "text",
  placeholder,
}) => (
  <div className={`${InputStyles["fom-input"]} ${error ? InputStyles['error'] : ''}`}>
    {/* <label htmlFor={name}>{label}</label> */}
    <input
      id={name}
      type={type}
      {...register(name)}
      placeholder={placeholder}
    />
    {error && <p className={`${InputStyles["input-error"]}`}>{error}</p>}
  </div>
);

export default TextInput;
