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
      pass: "",
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
          var splitArr = ((data1['data']).toString()).split(" ")
          this.setState({
            first: splitArr[0],
            last: splitArr[1],
            email: splitArr[2],
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
        <center> You may change your first name, last name, password, or delete your account. </center>
      </h2>
        <div className = "loginBox">
          <center>
          <h4 className = "noteWorthy"> <font size = "10"color="white"> NoteWorthy</font></h4>
          <form action = 'http://localhost:5000/changeInfo' method = 'POST'>
                  <input name="upFirst" className = "userInput" type="text" defaultValue={this.state.first} placeholder="Enter a new first name"></input>
                  <br></br>
                  <input name="upLast" className = "userInput" type="text" defaultValue={this.state.last} placeholder="Enter a new last name"></input>
                  <br></br>
                  <input name="upPass" className = "userInput" type="password" placeholder= "Enter a new password"></input>
                  <br></br>
                <button className="userInput" type="submit">Update Account</button>
              </form>
              <button className="float"onClick={() => {
                var result = window.confirm("Are you sure you want to delete your account?")
                if(result === true)
                {
                  window.location = "http://localhost:5000/delete"
                }}}className="userInput2" type="submit">Delete Account</button>
              <br></br>
              <br></br>
              <br></br>
          </center>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>);
    }
  }
  export default UpdateProfile
