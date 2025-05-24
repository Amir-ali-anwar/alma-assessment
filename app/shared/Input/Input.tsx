import React from "react";

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
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      {...register(name)}
      placeholder={placeholder}
    />
    {error && <p>{error}</p>}
  </div>
);

export default TextInput;
