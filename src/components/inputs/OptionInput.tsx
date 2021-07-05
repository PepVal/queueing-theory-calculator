import React from 'react';
import { UseFormRegister } from 'react-hook-form';

export enum OptionInputTypes {
  Radio = 'radio',
  Checkbox = 'checkbox',
}

interface OptionInputProps {
  label: string;
  name: string;
  option: string;
  type: OptionInputTypes;
  register: UseFormRegister<any>;
  error?: any;
  container?: string; // optional
  required?: any; // optional
  disabled?: boolean; // optional
}

const OptionInput = ({
  label,
  name,
  type,
  register,
  option,
  container = '',
  required = {},
  disabled = false,
}: OptionInputProps) => {
  return (
    <div className={`${container} flex items-center`}>
      <input
        id={name + option}
        disabled={disabled}
        value={option}
        type={type}
        {...register(name, required)}
      />
      <label className="ml-2 flex tracking-wide" htmlFor={name + option}>
        {label}
      </label>
    </div>
  );
};

export default OptionInput;
