import React from 'react';
import HomeMenu from '../components/menu/HomeMenu';

const Home = () => {
  return (
    <div
      className="h-full flex justify-center items-center"
      style={{ minHeight: 'inherit' }}
    >
      <HomeMenu />
    </div>
  );
};

export default Home;
