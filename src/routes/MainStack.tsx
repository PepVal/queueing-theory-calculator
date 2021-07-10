import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Routes from '../config/name.routes';
import Home from '../views/Home';
// import About from '../views/About';
import NotFoundPage from '../views/_404';
import MM1 from '../views/MM1';
import MMK from '../views/MMK';
// import MM1MM from '../views/MM1MM';
// import MMKMM from '../views/MMKMM';
import ToDo from '../views/ToDo';

const MainStack = () => {
  return (
    <Switch>
      <Route path={Routes.home} exact component={Home} />
      <Route path={Routes.about} exact component={ToDo} />
      <Route path={Routes.theory} exact component={ToDo} />
      <Route path={Routes.m_m_1} exact component={MM1} />
      <Route path={Routes.m_m_k} exact component={MMK} />
      <Route path={Routes.m_m_1_m_m} exact component={ToDo} />
      <Route path={Routes.m_m_k_m_m} exact component={ToDo} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default MainStack;
