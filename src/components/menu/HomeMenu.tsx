import React from 'react';
import { Link } from 'react-router-dom';

const HomeMenu = () => {
  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col border border-gray-300 lg:flex-row">
      <TheoryOption
        title="1er Modelo"
        subtitle="subtitle"
        route="/"
        position={1}
      />
      <TheoryOption
        title="2er Modelo"
        subtitle="subtitle"
        route="/"
        position={2}
      />
      <TheoryOption
        title="3er Modelo"
        subtitle="subtitle"
        route="/"
        position={3}
      />
      <TheoryOption
        title="4er Modelo"
        subtitle="subtitle"
        route="/"
        position={4}
      />
    </div>
  );
};

const TheoryOption = ({ title, subtitle, route, position }: any) => {
  const positionBorderStyle = (pos: number) => {
    return position === 4 ? '' : 'border-b border-gray-300 lg:border';
  };

  return (
    <Link to={route}>
      <div
        className={`${positionBorderStyle(position)} p-11 w-56
        hover:bg-gray-100
        `}
      >
        <h3 className="font-semibold">{title}</h3>
        <p>{subtitle}</p>
      </div>
    </Link>
  );
};

export default HomeMenu;
