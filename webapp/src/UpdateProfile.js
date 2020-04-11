
import React from 'react';
import './noteworthy.css'
import Dashboard from './Dashboard.js'

class UpdateProfile extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {

      return (<div>
        <Dashboard>
        </Dashboard>
        <br></br>
        <br></br>
        <br></br>

      <h1 className = "loginHeader">
        <center> Need to Update your Account? </center>
      </h1>
      <br></br>
      <br></br>

      <h2 className = "loginSub">
        <center> Enter the information below to update your account. </center>
      </h2>
        <div className = "loginBox">
          <center>
          <h4 className = "noteWorthy"> <font size = "10"color="white"> NoteWorthy</font></h4>
          <form action = 'http://localhost:5000/changeInfo' method = 'POST'>
                  <input className = "userInput"required type="text" name="subject" value = "" placeholder= ""></input>
                  <br></br>
                  <input className = "userInput"required type="text" name="subject" value = "" placeholder= ""></input>
                  <br></br>
                  <input className = "userInput"required type="text" name="message" value = "" placeholder= "" ></input>
                  <br></br>
                  <input className = "userInput"required type="text" name="message" value = "" placeholder= ""></input>
                  <br></br>
                <button className="userInput" type="submit">Update Account</button>
              </form>
              <br></br>
          </center>
        </div>
      </div>);
    }
  }
  export default UpdateProfile
