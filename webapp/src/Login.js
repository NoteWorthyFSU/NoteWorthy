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
        <h1 className = "loginHeader">
          <center> Let's get started now! </center>
        </h1>

        <h2 className = "loginSub">
          <center> Or create an account if not registered yet </center>
        </h2>
  
          <div className = "loginBox">
            <center>
            <h4 className = "noteWorthy"> NoteWorthy</h4>
            <form action = 'http://localhost:5000/login' method = 'POST'>
                    <input className = "userInput"required type="text" name="username" placeholder="Username"></input>
                    <br></br>
                  <input required className="userInput" type="password" name="password" placeholder="Password"></input>
                    <br></br>
                  <button className="userInput" type="submit">Sign In</button>
                </form>
                <button className="userInputPW" type="submit">Forgot Password</button>
            </center>
          </div>
        </div>);
    }
}
export default Login
