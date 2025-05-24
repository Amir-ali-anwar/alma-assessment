import React from "react";
import InputStyles from "../Input.module.scss";
import { UseFormRegister } from "react-hook-form";

import {LeadFormData} from "@/app/(public)/lead-form/page";
interface TextAreaProps {
  label?: string;
  name: keyof LeadFormData;
  register: UseFormRegister<LeadFormData>;
  error?: string;
  placeholder?: string;
}

const TextAreaInput: React.FC<TextAreaProps> = ({
  name,
  register,
  error,
  placeholder,
}) => (
  <div className={`${InputStyles['form-textarea']}  ${error ? InputStyles['error'] : ''}`}>
    {/* <label htmlFor={name}>{label}</label> */}
    <textarea
      rows={100}
      cols={39}
      id={name}
      {...register(name)}
      placeholder={placeholder}
    />
    {error && <p className={`${InputStyles['input-error']}`} >{error}</p>}
  </div>
);

export default TextAreaInput;
