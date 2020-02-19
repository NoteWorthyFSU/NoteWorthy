import React from 'react';
import './noteworthy.css'
class Login extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }


    render() {
        return (<div className = "loginBox">
        <h1>
          <center> Let's get started now! </center>
        </h1>

        <h1>
          <center> Or create an account if not registered yet </center>
        </h1>

            <form action = 'http://localhost:5000/login' method = 'POST'>
                    <input className = "userInput"required type="text" name="username" placeholder="Username"></input>
                    <br></br>
                  <input required className="userInput" type="password" name="password" placeholder="Password"></input>
                    <br></br>
                  <button className="userInput" type="submit">Sign In</button>

                </form>
                <button className="userInput" type="submit">Forgot Password</button>


        </div>);
    }
}
export default Login
