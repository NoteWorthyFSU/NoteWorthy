import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import Notes from './Notes';
import Error from './Error';
import Dashboard from './Dashboard';
import { Redirect, Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import {render} from 'react-dom';
import './noteworthy.css'
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route  exact path="/Notes" component={Notes}/>
      <Route  exact path="/Dashboard" component={Dashboard}/>
      <Route exact path="/*" component={Error}/>
    </Switch>
  </Router>
)

//the code below reads the path and renders component on a conditional basis. i.e. /home throws two different components at different places...
ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
