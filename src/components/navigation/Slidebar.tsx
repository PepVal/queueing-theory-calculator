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
      <Link className="hidden lg:block" to="/theory">
        Theory
      </Link>
      <Link className="hidden lg:block" to="/about">
        About
      </Link>
      <Link className="hidden lg:block" to="/#">
        GitHub
      </Link>
    </Menu>
  );
};

export default Slidebar;
