import React from 'react';
import './noteworthy.css'
class Login extends React.Component {

    constructor() {
        super();
        this.state = {
      }
    }


    render() {
        return (<div>
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
          <a href="http://localhost:3000/">Don't have an account? Click here to sign up.</a>
          </div>
          <br></br>
            </center>
          </div>
        </div>);
    }
}
export default Login
