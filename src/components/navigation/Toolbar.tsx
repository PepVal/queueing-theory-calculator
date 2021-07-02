import React from 'react';
import { Link } from 'react-router-dom';
import Slidebar from './Slidebar';

const Toolbar = (props: { heightVh: number }) => {
  return (
    <header
      className="w-full h-14 bg-blue-500 flex items-center lg:justify-center"
      style={{ height: `${props.heightVh}vh` }}
    >
      <div className="lg:hidden">
        <Slidebar />
      </div>
      <div className="absolute flex items-center justify-center w-full lg:w-11/12">
        <h1 className="text-xl font-bold text-white lg:text-center lg:whitespace-nowrap">
          <Link to="/">Queueing Calculator</Link>
        </h1>
        <div className="hidden lg:flex lg:w-full lg:justify-end">
          <Link className="" to="/theory">
            Theory
          </Link>
          <Link className="" to="/about">
            About
          </Link>
          <Link className="" to="/#">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Toolbar;
