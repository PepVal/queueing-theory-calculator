import React from 'react';

const ToDo = () => {
  return (
    <div
      className="flex justify-center h-full items-center"
      style={{ minHeight: 'inherit' }}
    >
      <div className="flex flex-col justify-center items-center p-6 border rounded-md bg-white shadow-md">
        <h2 className="text-3xl font-bold text-center py-3">
          Ups... Esta pagina esta incompleta
        </h2>
        <p className="text-base text-center py-2">
          Estamos trabajando en esta pagina, de momento mira estos gatitos
        </p>
        <img
          className="w-64 h-44 rounded-md shadow-sm"
          src="https://www.trecebits.com/wp-content/uploads/2015/08/slide_303383_2577027_free.gif"
          alt="gatitos"
        />
      </div>
    </div>
  );
};

export default ToDo;
