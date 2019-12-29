import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Scheme from '../components/Scheme.js';
import Register from '../components/auth/Register.js';
import Login from '../components/auth/Login.js';
import StartPage from '../components/StartPage.js';
import { Provider } from "react-redux";
import store from "../store";

const AppRouter = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={StartPage} exact={true}/>
          <Route path="/login" component={Login} exact={true}/>
          <Route path="/register" component={Register} exact={true}/>
          <Route path="/view" component={Scheme} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)

export default AppRouter;
