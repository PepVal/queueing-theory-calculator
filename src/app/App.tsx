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
        <div style={{ height: '92vh' }}>
          <MainStack />
        </div>
      </div>
    </Router>
  );
};

export default App;
