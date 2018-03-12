import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFoundPage from '../components/NotFoundPage';
import ThoughtsApp from '../components/ThoughtsApp';
import Header from '../components/Header';
import Login from '../components/Login';
import Profile from '../components/Profile';
import CreateAccount from '../components/CreateAccount';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={ThoughtsApp} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={CreateAccount} />
        <Route component={Login} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
