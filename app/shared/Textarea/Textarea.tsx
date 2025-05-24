import React from "react";

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
  <div>
    <label htmlFor={name}>{label}</label>
    <textarea
      id={name}
      {...register(name)}
      placeholder={placeholder}
    />
    {error && <p>{error}</p>}
  </div>
);

export default TextAreaInput;
