import React from 'react';
import './noteworthy.css'
import Dashboard from './Dashboard.js'

class UpdateProfile extends React.Component {

  constructor() {
    super();
    this.state = {
      first: "",
      last: "",
      email: "",
    }
  }

  componentDidMount() 
  {
    Promise.all([
      fetch('http://localhost:5000/changeInfo'),
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => 
        {  
          this.setState({
            first: data1['data'][0],
            last: data1['data'][1],
            email: data1['data'][2],
          })
      });   

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
                  <input name="upFirst" className = "userInput" type="text" name="subject" placeholder={this.state.first}></input>
                  <br></br>
                  <input name="upLast" className = "userInput" type="text" name="subject" placeholder={this.state.last}></input>
                  <br></br>
                  <input name="upEmail" className = "userInput" type="text" name="message" placeholder={this.state.email} ></input>
                  <br></br>
                  <input name="upPass" className = "userInput" type="text" name="message" placeholder= "Enter a new password"></input>
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