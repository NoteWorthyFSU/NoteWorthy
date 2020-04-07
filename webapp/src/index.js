import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import SignUp from './SignUp';
import Notes from './Notes';
import Error from './Error';
import Dashboard from './Dashboard';
import ContactUs from './ContactUs';
import Mission from './Mission';
import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import MeetOurTeam from './MeetOurTeam';



import { Redirect, Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import {render} from 'react-dom';
import './noteworthy.css'
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={SignUp}/>
      <Route  exact path="/Notes" component={Notes}/>
      <Route  exact path="/Dashboard" component={Dashboard}/>
      <Route  exact path="/ContactUs" component={ContactUs}/>
      <Route  exact path="/Mission" component={Mission}/>
      <Route  exact path="/UpdateProfile" component={UpdateProfile}/>
      <Route  exact path="/ChangePassword" component={ChangePassword}/>
      <Route  exact path="/MeetOurTeam" component={MeetOurTeam}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/*" component={Error}/>
    </Switch>
  </Router>
)

//the code below reads the path and renders component on a conditional basis. i.e. /home throws two different components at different places...
ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
