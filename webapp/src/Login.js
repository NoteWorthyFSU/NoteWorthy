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
            <form action = 'http://localhost:5000/login' method = 'POST'>
                    <input className = "userInput"required type="text" name="username" placeholder="Username"></input>
                    <br></br>
                  <input required className="userInput" type="password" name="password" placeholder="Password"></input>
                    <br></br>
                  <button className="userInput" type="submit">Log In</button>
                </form>
            
        </div>);   
    }
}
export default Login