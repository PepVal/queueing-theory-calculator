import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import NotFoundPage from '../views/_404';

const MainStack = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default MainStack;
