import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button, { ButtonType } from '../components/buttons/Button';
import Input, { InputTypes } from '../components/inputs/Input';

type MM1Values = {
  lambda: number;
  miu: number;
  ro: number;
};

const MM1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MM1Values>();

  const onSubmit: SubmitHandler<MM1Values> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center h-full lg:items-center">
      <div className="flex flex-col rounded-xl w-full shadow-md overflow-hidden sm:w-11/12 lg:flex-row lg:w-11/12">
        <form className="bg-white p-3 border" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Lambda"
            name="lambda"
            placeholder="0"
            type={InputTypes.Number}
            register={register}
            error={errors.lambda}
          />
          <Input
            label="Ro"
            name="ro"
            placeholder="0"
            type={InputTypes.Number}
            register={register}
            error={errors.ro}
          />
          <Input
            label="Miu"
            name="miu"
            placeholder="0"
            type={InputTypes.Number}
            register={register}
            error={errors.miu}
          />
          <Button text="Calcular" type={ButtonType.Submit} />
        </form>
        <div className="w-full min-h-full bg-gray-200  flex items-center justify-center border">
          answers
        </div>
      </div>
    </div>
  );
};

export default MM1;
