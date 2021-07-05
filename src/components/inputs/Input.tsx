import React from 'react';
import { UseFormRegister } from 'react-hook-form';

export enum InputTypes {
  Text = 'text',
  Number = 'number',
}

interface InputProps {
  symbol: string;
  label: string;
  placeholder: string;
  name: string;
  type: InputTypes;
  register: UseFormRegister<any>;
  error: any;
  container?: string; // optional
  required?: any; // optional
  disabled?: boolean; // optional
}

const Input = ({
  symbol,
  label,
  placeholder,
  name,
  type,
  register,
  error,
  container = '',
  required = { required: false },
  disabled = false,
}: InputProps) => {
  return (
    <>
      <div className={container}>
        <label className="ml-2 flex tracking-wide mb-2" htmlFor={name}>
          <p className="text-2xl font-bold">{symbol}</p>
          <p className="ml-2 self-end">{label}</p>
          {required.required ? (
            <span className="text-red-500 self-end">{'*'}</span>
          ) : null}
        </label>
        <input
          className={`text-black appearance-none block w-full ${
            disabled ? 'bg-gray-300' : 'bg-grey-lighter'
          }
          border border-grey-lighter rounded py-3 px-4`}
          id={name}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          {...register(name, required)}
        />
        {error && (
          <small className="mt-2 ml-2 block tracking-wide text-grey-darker text-red-500 text-xs font-semibold mb-1">
            {error.message}
          </small>
        )}
      </div>
    </>
  );
};

export default Input;
