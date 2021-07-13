import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

const Slidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu
      isOpen={isOpen}
      onStateChange={(state) => {
        setIsOpen(state.isOpen);
      }}
    >
      <Link
        onClick={() => {
          setIsOpen(false);
        }}
        className="hidden lg:block"
        to="/theory"
      >
        Theory
      </Link>
      <Link
        onClick={() => {
          setIsOpen(false);
        }}
        className="hidden lg:block"
        to="/about"
      >
        About
      </Link>
      <a
        onClick={() => {
          setIsOpen(false);
        }}
        title="GitHub repository"
        className="hidden lg:block"
        href="https://github.com/PepVal/queueing-theory-calculator"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </Menu>
  );
};

export default Slidebar;
