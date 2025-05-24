import React from "react";
import InputStyles from '../Input.module.scss';
import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";

interface TextInputProps<TForm extends FieldValues> {
  label: string;
  name: FieldPath<TForm>;
  register: UseFormRegister<TForm>;
  error?: string;
  type?: string;
  placeholder?: string;
}

function TextInput<TForm extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
}: TextInputProps<TForm>) {
  return (
    <div className={`${InputStyles["fom-input"]} ${error ? InputStyles['error'] : ''}`}>
      <label htmlFor={name as string}>{label}</label>
      <input
        id={name as string}
        type={type}
        {...register(name)}
        placeholder={placeholder}
      />
      {error && <p className={`${InputStyles["input-error"]}`}>{error}</p>}
    </div>
  );
}

export default TextInput;
