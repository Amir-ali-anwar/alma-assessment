import React from "react";
import InputStyles from '../Input.module.scss'
interface TextInputProps {
  label: string;
  name: string;
  register: any;
  error?: string;
  type?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
}) => (
  <div className={`${InputStyles["fom-input"]}`}>
    <label htmlFor={name}>{label}</label>
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
