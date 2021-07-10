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

const CostTab = ({ mmk }: CostMMKProps) => {
  const [showResult, setShowResult] = useState(false);
  const [cost, setCost] = useState<CostMMK>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    setShowResult(false);
    let time = parseFloat(data.time.toString());
    const cost = new CostMMK(mmk, time);
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
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Input
            symbol="Cts"
            label="costo por tiempo en el sistema"
            name="cts"
            placeholder="0"
            type={InputTypes.Number}
            register={register}
            error={errors.cts}
          />
          <Input
            symbol="Cs"
            label="costo del servidor"
            name="cs"
            placeholder="0"
            type={InputTypes.Number}
            register={register}
            error={errors.cs}
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
            value={cost?.ctExercise.toFixed(6)}
          />
        ) : (
          <div className="flex justify-center items-center">
            Presiona Calcular Costos para ver los resultados
          </div>
        )}
      </div>
    </div>
  );
};

export default CostTab;
