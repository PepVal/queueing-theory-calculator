import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Toolbar from '../components/navigation/Toolbar';
import MainStack from '../routes/MainStack';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="h-screen">
        <Toolbar heightVh={8} />
        <div
          className="overflow-y-scroll"
          style={{ height: '92vh', maxHeight: '92vh', minHeight: '92vh' }}
        >
          <MainStack />
        </div>
      </div>
    </Router>
  );
};

export default App;
