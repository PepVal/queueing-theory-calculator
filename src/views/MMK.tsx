import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonType } from '../components/buttons/Button';
import Input, { InputTypes } from '../components/inputs/Input';
import OptionInput, {
  OptionInputTypes,
} from '../components/inputs/OptionInput';
import { MMKModel } from '../library/queueing/formulas/MMK.model';
import { SystemOrQueuing, TypeCalculate } from '../library/queueing/Constants';
import TabsMMK from '../components/tabs/TabsMMK';

type MMKValues = {
  lambda: number;
  miu: number;
  k: number;
  n: number;
  calculate: TypeCalculate;
  system: SystemOrQueuing;
};

const LabelSystemOrQueuing: any = {
  system: 'el sistema',
  queuing: 'la cola',
};

const LabelTypeCalculate: any = {
  fixed: 'exactamente',
  max: 'máximo',
  least: 'al menos',
};

const MMK = () => {
  const [showResult, setShowResult] = useState({ loading: false, show: false });
  const [result, setResult] = useState<MMKModel>(new MMKModel(0,0,0));
  const [labelPn, setLabelPn] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MMKValues>();

  const onSubmit: SubmitHandler<MMKValues> = async (data) => {
    // parse data for avoid problems
    let lambda = parseFloat(data.lambda.toString());
    let miu = parseFloat(data.miu.toString());
    let k = parseInt(data.k.toString());
    let n = parseInt(data.n.toString());
    const model = new MMKModel(lambda, miu, k, n);

    if (!model.isMultichannel())
      return alert('El problema no es de tipo M/M/K');

    if (model.isStatable()) {
      setShowResult({ loading: true, show: false });
      await model.calculateAll(data.system, data.calculate);
      setResult(model);
      setLabel(n, data.calculate, data.system);
      setShowResult({ loading: false, show: true });
    } else {
      alert('no cumple con la condición de estabilidad');
    }
  };

  useEffect(() => {
    setValue('calculate', TypeCalculate.Fixed);
    setValue('system', SystemOrQueuing.System);
  }, [setValue]);

  const setLabel = (n: number, calculate: string, operation: string) => {
    setLabelPn(`Probabilidad de hallar 
    ${LabelTypeCalculate[calculate] || 'exactamente'} 
    ${n} clientes en ${LabelSystemOrQueuing[operation] || 'el sistema'}`);
  };
  
  return (
    <div className="flex justify-center h-full lg:items-center">
      <div className="flex flex-col rounded-xl w-full shadow-md overflow-hidden sm:w-11/12 lg:flex-row lg:w-11/12">
        <div className="bg-white px-6 pt-4 border w-full">
          <div className="relative flex my-3 justify-center items-center">
            <Link
              to="/"
              className="absolute left-0 hover:bg-gray-200 rounded-full p-2"
              title="back"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
                />
              </svg>
            </Link>
            <h2 className="font-bold text-2xl">M/M/k</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
              <Input
                symbol="λ"
                label="tasa de llegada"
                name="lambda"
                placeholder="0"
                type={InputTypes.Number}
                register={register}
                error={errors.lambda}
                step="0.001"
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
                container="mt-2 lg:mt-0"
                step="0.001"
                required={{ required: 'El campo es obligatorio' }}
              />
            </div>
            <Input
              symbol="k"
              label="número de servidores"
              name="k"
              placeholder="2"
              type={InputTypes.Number}
              register={register}
              error={errors.k}
              container="mt-2"
              required={{
                required: 'El campo es obligatorio',
                min: {
                  value: 2,
                  message: 'Debe tener mínimo 2 servidores para ser M/M/K',
                },
              }}
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
                    label="Exactamente"
                    name="calculate"
                    option={TypeCalculate.Fixed}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                  <OptionInput
                    label="Al menos"
                    name="calculate"
                    option={TypeCalculate.AtLeast}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                  <OptionInput
                    label="Máximo"
                    name="calculate"
                    option={TypeCalculate.Max}
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
          ${!showResult.show ? 'bg-gray-200' : 'bg-white'}`}
        >
          {showResult.loading ? (
            <p className="self-center my-36">Calculando resultados...</p>
          ) : !showResult.show ? (
            <p className="self-center my-36">
              Presiona Calcular para ver los resultados
            </p>
          ) : (
            <div>
              <TabsMMK result={result} labelPn={labelPn} />

              {/* <div className="relative flex my-3 justify-center items-center">
                <h2 className="font-bold text-2xl">Resultados</h2>
              </div>
             */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MMK;
