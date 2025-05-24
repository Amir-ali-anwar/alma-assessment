import React from "react";
import InputStyles from "../Input.module.scss";

interface TextAreaProps {
  label: string;
  name: string;
  register: any;
  error?: string;
  placeholder?: string;
}

const TextAreaInput: React.FC<TextAreaProps> = ({
  label,
  name,
  register,
  error,
  placeholder,
}) => (
  <div className={`${InputStyles['form-textarea']} ${error ? InputStyles['error'] : ''} ${error ? InputStyles['error'] : ''}`}>
    {/* <label htmlFor={name}>{label}</label> */}
    <textarea
      rows={100}
      cols={39}
      id={name}
      {...register(name)}
      placeholder={placeholder}
    />
    {error && <p>{error}</p>}
  </div>
);

export default TextAreaInput;
