import React from 'react';
import './noteworthy.css'
import { Redirect } from 'react-router-dom';
class Login extends React.Component {

    constructor() {
        super();
        this.state = {
          invalidCredentials: false,
          duplicate: false,
          login: true

      }
      this.switchForm = this.switchForm.bind(this);
    }

    componentWillMount()
  {
    const axios = require('axios');
    const axiosWithCookies = axios.create({
      withCredentials: true
    });
    //connects to the login endpoint and reads the session cookie to see if the user is logged in to gain access to the cards page
    axiosWithCookies.get(`http://localhost:5000/invalidCredentials`)
        .then((response) => {
            this.setState({invalidCredentials: (response.data['data'])})
          

        }).catch((error) => {
            alert("There was an error connecting to the api")
            console.error(error);
        });
    //connects to the login endpoint and reads the session cookie to see if the user is logged in to gain access to the cards page
    axiosWithCookies.get(`http://localhost:5000/duplicate`)
        .then((response) => {
            this.setState({duplicate: (response.data['data'])})
          

        }).catch((error) => {
            alert("There was an error connecting to the api")
            console.error(error);
        });
  }

  switchForm() {
    if(this.state.login === true)
    {
      this.setState({login: false})
    }
    else
    {
      this.setState({login: true})
    }

  }

    render() {
        return this.state.login ? 
        (<div>

          {this.state.invalidCredentials === true && 
          <div>
            {alert("the credentials you entered were invalid.")}
            {this.setState({invalidCredentials: false})}
            </div>}
          
            {this.state.duplicate === true && 
          <div>
            {alert("the user already exists.")}
            {this.setState({duplicate: false})}
            </div>}
          <br></br>
          <br></br>
          <br></br>

        <h1 className = "loginHeader">
          <center> Log in to get started now! </center>
        </h1>
        <br></br>
        <br></br>

        <h2 className = "loginSub">
          <center> Or create an account if not registered yet </center>
        </h2>
          <div className = "loginBox">
            <center>
            <h4 className = "noteWorthy"> <font size = "10"color="white"> NoteWorthy</font></h4>
            <form action = 'http://localhost:5000/login' method = 'POST'>
                    <input className = "userInput"required type="text" name="email" placeholder="Username"></input>
                    <br></br>
                  <input required className="userInput" type="password" name="password" placeholder="Password"></input>
                    <br></br>
                  <button className="userInput" type="submit">Sign In</button>
                </form>
                <br></br>
          <div className = "smalltext">
          <button onClick={this.switchForm.bind()}>Don't have an account? Click here to sign up.</button>
          </div>
          <br></br>
            </center>
          </div>
        </div>)
        :
        (
          <div>
            <br></br>
          <br></br>
          <br></br>

        <h1 className = "loginHeader">
          <center> Sign up for an account now! </center>
        </h1>
        <br></br>
        <br></br>

        <h2 className = "loginSub">
          <center>To get started enter the information below to create an account </center>
        </h2>
          <div className = "loginBox">
            <center>
            <h4 className = "noteWorthy"> <font size = "10"color="white"> Welcome to NoteWorthy</font></h4>
            <form action = 'http://localhost:5000/register' method = 'POST'>
                  <input className = "userInput"required type="text" name="firstname" placeholder="Enter your First Name"></input>
                    <br></br>
                  <input className = "userInput"required type="text" name="lastname" placeholder="Enter your Last Name"></input>
                    <br></br>
                  <input className = "userInput"required type="text" name="email" placeholder="Enter your E-Mail"></input>
                    <br></br>
                  <input required className="userInput" type="password" name="password" placeholder="Choose a Password"></input>
                    <br></br>
                  <button className="userInput" type="submit">Sign Up</button>
                </form>
                <br></br>
                <div className = "smalltext">
                <button onClick={this.switchForm.bind()}>Don't have an account? Click here to sign up.</button>
                </div>
                <br></br>
            </center>
          </div>
          </div>
        )
    }
}
export default Login
