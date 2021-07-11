import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CostMMK } from '../../library/queueing/cost/CostMMK';
import { MMKModel } from '../../library/queueing/formulas/MMK.model';
import Button, { ButtonType } from '../buttons/Button';

import Input, { InputTypes } from '../inputs/Input';
import ResultItem from '../results/ResultItem';

interface CostMMKProps {
  mmk: MMKModel;
}

type CostMMKValues = {
  time: number;
  cts: number;
  cs: number;
};

const CostTab = ({ mmk }: CostMMKProps) => {
  const [showResult, setShowResult] = useState(false);
  const [cost, setCost] = useState<CostMMK>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CostMMKValues>();

  const onSubmit: SubmitHandler<CostMMKValues> = (data) => {
    console.log(data);
    setShowResult(false);
    let time = parseFloat(data.time.toString());
    let cts = parseFloat(data.cts.toString());
    let cs = parseFloat(data.cs.toString());
    const cost = new CostMMK(mmk, time);
    cost.calculateExercise(cs, cts);
    setCost(cost);
    setShowResult(true);
  };

  return (
    <div className="flex flex-col">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input
          symbol="H"
          label="horas día laborable"
          name="time"
          placeholder="0"
          type={InputTypes.Number}
          register={register}
          error={errors.time}
          required={{ required: 'El campo es obligatorio' }}
        />
        <div className="mt-2 flex flex-col lg:grid lg:grid-cols-2 lg:gap-2">
          <Input
            symbol="Cts"
            label="$ por tiempo en el sistema"
            name="cts"
            placeholder="0"
            type={InputTypes.Number}
            register={register}
            error={errors.cts}
            step="0.001"
            required={{ required: 'El campo es obligatorio' }}
          />
          <Input
            symbol="Cs"
            label="$ del servidor"
            name="cs"
            placeholder="0"
            type={InputTypes.Number}
            register={register}
            error={errors.cs}
            step="0.001"
            required={{ required: 'El campo es obligatorio' }}
          />
        </div>

        <div className="my-8">
          <Button text="Calcular Costos" type={ButtonType.Submit} />
        </div>
      </form>
      <div>
        {showResult ? (
          <ResultItem
            label="Costo total del sistema"
            symbol="CT"
            value={cost?.ctExercise.toFixed(5)}
          />
        ) : (
          <div className="flex justify-center items-center p-12 rounded-sm bg-gray-200">
            Presiona Calcular Costos para ver los resultados
          </div>
        )}
      </div>
    </div>
  );
};

export default CostTab;
