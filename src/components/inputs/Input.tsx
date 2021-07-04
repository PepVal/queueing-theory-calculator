import React from 'react';
import { UseFormRegister } from 'react-hook-form';

export enum InputTypes {
  Text = 'text',
  Number = 'number',
}

interface InputProps {
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
  label,
  placeholder,
  name,
  type,
  register,
  error,
  container,
  required = { required: 'El campo es obligatorio' },
  disabled = false,
}: InputProps) => {
  return (
    <>
      <div className={container || 'pt-3 px-3 mb-6 md:mb-0'}>
        <label
          className="ml-2 block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor={name}
        >
          {label}
          {required ? <span className="text-red-500">{' *'}</span> : null}
        </label>
        <input
          className={`text-black appearance-none block w-full ${
            disabled ? 'bg-gray-300' : 'bg-grey-lighter'
          } text-grey-darker 
          border border-grey-lighter rounded py-3 px-4`}
          id={name}
          disabled={disabled || false}
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
