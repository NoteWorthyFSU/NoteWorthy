import React from 'react';
import './noteworthy.css'
class SignUp extends React.Component {

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
                <a href="http://localhost:3000/login">Already have an account? Click here to login</a>
                </div>
                <br></br>
            </center>
          </div>
        </div>);
    }
}
export default SignUp
