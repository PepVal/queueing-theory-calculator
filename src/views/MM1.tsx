import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

import ResultItem from '../components/results/ResultItem';
import Button, { ButtonType } from '../components/buttons/Button';
import Input, { InputTypes } from '../components/inputs/Input';
import OptionInput, {
  OptionInputTypes,
} from '../components/inputs/OptionInput';
import {
  SystemOrQueuing,
  TypeCalculateMM1,
} from '../library/queueing/MM1.model';

type MM1Values = {
  lambda: number;
  miu: number;
  n: number;
  calculate: string;
  system: string;
};

const MM1 = () => {
  const [showResult, setShowResult] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MM1Values>();

  const onSubmit: SubmitHandler<MM1Values> = (data) => {
    console.log(data);
    if (data.lambda < data.miu) {
      setShowResult(true);
    } else {
      alert('no cumple con la condición de estabilidad');
    }
  };

  return (
    <div className="flex justify-center h-full lg:items-center">
      <div className="flex flex-col rounded-xl w-full shadow-md overflow-hidden sm:w-11/12 lg:flex-row lg:w-11/12">
        <div className="bg-white px-6 pt-4 border w-full">
          <div className="relative flex my-3 justify-center items-center">
            <Link to="/" className="absolute left-0 hover:bg-gray-200 rounded-full p-2" title="back">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
                />
              </svg>
            </Link>
            <h2 className="font-bold text-2xl">M/M/1</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              symbol="λ"
              label="tasa de llegada"
              name="lambda"
              placeholder="0"
              type={InputTypes.Number}
              register={register}
              error={errors.lambda}
              required={{ required: 'El campo es obligatorio' }}
            />
            <Input
              symbol="μ"
              label="tasa de servicio"
              name="miu"
              placeholder="0"
              type={InputTypes.Number}
              register={register}
              error={errors.miu}
              container="mt-2"
              required={{ required: 'El campo es obligatorio' }}
            />
            <div className="mt-2">
              <Input
                symbol="N"
                label="clientes"
                name="n"
                placeholder="0"
                type={InputTypes.Number}
                register={register}
                error={errors.n}
              />
            </div>
            <div className="ml-2 mt-2">
              <p>Opciones para calculo de Pn</p>
              <div className="flex mt-1">
                <div>
                  <OptionInput
                    label="Fijo"
                    name="calcule"
                    option={TypeCalculateMM1.Fixed}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                  <OptionInput
                    label="Al menos"
                    name="calcule"
                    option={TypeCalculateMM1.AtLeast}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                  <OptionInput
                    label="Máximo"
                    name="calcule"
                    option={TypeCalculateMM1.Max}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                </div>
                <div className="ml-4">
                  <OptionInput
                    label="Sistema"
                    name="system"
                    option={SystemOrQueuing.System}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                  <OptionInput
                    label="Cola"
                    name="system"
                    option={SystemOrQueuing.Queuing}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                </div>
              </div>
            </div>
            <div className="my-8">
              <Button text="Calcular" type={ButtonType.Submit} />
            </div>
          </form>
        </div>
        <div
          className={`w-full lg:min-h-full flex justify-center border px-6 pt-4
        ${!showResult ? 'bg-gray-200' : 'bg-white'}`}
        >
          {!showResult ? (
            <p className="self-center my-36">
              Presiona Calcular para ver los resultados
            </p>
          ) : (
            <div>
              <div className="relative flex my-3 justify-center items-center">
                <h2 className="font-bold text-2xl">Resultados</h2>
              </div>
              <div className="grid grid-cols-2 gap-16 ">
                <div>
                  <ResultItem symbol="ρ" value={123132} />
                  <ResultItem symbol="P0" value={123132} />
                  <ResultItem symbol="Pn" value={123132} />
                  <ResultItem symbol="Lq" value={123132} />
                  <ResultItem symbol="L" value={123132} />
                </div>
                <div>
                  <ResultItem symbol="Wq" value={123132} />
                  <ResultItem symbol="W" value={123132} />
                  <ResultItem symbol="Ln" value={123132} />
                  <ResultItem symbol="Wn" value={123132} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MM1;
