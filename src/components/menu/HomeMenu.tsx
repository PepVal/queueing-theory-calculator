import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../../config/name.routes';

const HomeMenu = () => {
  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col border border-gray-300 overflow-hidden lg:grid lg:grid-cols-2 lg:gap-0">
      <TheoryOption
        title="M/M/1"
        subtitle="Población infinita canal simple"
        route={Routes.m_m_1}
        position={1}
      />
      <TheoryOption
        title="M/M/k"
        subtitle="Población infinita canal multiple"
        route={Routes.m_m_k}
        position={2}
      />
      <TheoryOption
        title="M/M/1/M/M"
        subtitle="Población finita canal simple"
        route={Routes.m_m_1_m_m}
        position={3}
      />
      <TheoryOption
        title="M/M/k/M/M"
        subtitle="Población finita canal multiple"
        route={Routes.m_m_k_m_m}
        position={4}
      />
    </div>
  );
};

const OptionLayout: any = {
  1: {
    borders: 'border-b border-gray-300 lg:border-r ',
  },
  2: {
    borders: 'border-b border-gray-300 lg:border-l',
  },
  3: {
    borders: 'border-b border-gray-300 lg:border-b-0 lg:border-t lg:border-r',
  },
  4: {
    borders: 'border-b border-gray-300 lg:border-b-0 lg:border-t lg:border-l',
  },
};

const TheoryOption = ({ title, subtitle, route, position }: any) => {
  const positionBorderStyle = (pos: number) => {
    return OptionLayout[pos].borders;
  };

  return (
    <Link to={route}>
      <div
        className={`${positionBorderStyle(position)} p-11 w-60 sm:w-80
        hover:bg-gray-100
        `}
      >
        <h3 className="font-bold text-lg">{title}</h3>
        <p>{subtitle}</p>
      </div>
    </Link>
  );
};

export default HomeMenu;
