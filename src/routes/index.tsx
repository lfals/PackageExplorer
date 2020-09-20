/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import News from '../pages/News';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/correios"  component={Dashboard} />
    <Route path="/news"  component={News} />
    <Route path="/repository/:repository+" component={Repository} />
  </Switch>
);

export default Routes;
