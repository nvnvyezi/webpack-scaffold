import React from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Loading from 'components/Loading/Loading';

import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&name=test!pages/Home/Home';
import Page1 from 'bundle-loader?lazy&name=page1!pages/page1/page1';
import Counter from 'bundle-loader?lazy&name=counter!pages/counter/counter';
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/UserInfo';
import NotFound from 'bundle-loader?lazy&name=userInfo!pages/NotFound/NotFound';

const createComponent = component => props => (
  <Bundle load={component}>
  {
    (Component) => Component ? <Component {...props} /> : <Loading />
  }
  </Bundle>
);

export default () => (
  <div>
    <Switch>
      <Route exact path="/" component={createComponent(Home)} />
      <Route path="/page1" component={createComponent(Page1)} />
      <Route path="/counter" component={createComponent(Counter)} />
      <Route path="/userinfo" component={createComponent(UserInfo)} />
      <Route component={createComponent(NotFound)} />
    </Switch>
  </div>
);