/*https://www.youtube.com/watch?v=wHFflWvii3M*/
import React from 'react';
import './noteworthy.css'
import {Redirect} from 'react-router-dom'

class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {isLoggedIn: true}
  }

  componentWillMount()
  {
    const axios = require('axios');
    const axiosWithCookies = axios.create({
      withCredentials: true
    });
    //connects to the login endpoint and reads the session cookie to see if the user is logged in to gain access to the cards page
    axiosWithCookies.get(`http://localhost:5000/isLoggedIn`)
        .then((response) => {
            this.setState({isLoggedIn: (response.data['data'])})

        }).catch((error) => {
            alert("There was an error connecting to the api")
            console.error(error);
        });
  }
  render() {
    return  this.state.isLoggedIn === true ? (<div>
      {
      <form action = 'http://localhost:3000/dashboard' method = 'POST'>
      <html>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <body>
      <div className = "menu-bar">
      <ul>
      <li> <a href="http://localhost:3000/dashboard">Dashboard</a> </li>
      <li> <a href="http://localhost:3000/mission">About Us </a>
      <div className="sub-menu-1">
        <ul>
          <li> <a href="http://localhost:3000/mission">Mission + Vision </a></li>
          <li> <a href="http://localhost:3000/meetourteam">Meet Our Team</a></li>
        </ul>
      </div>
      </li>
      <li> <a href="http://localhost:3000/notes">Notes</a> </li>
      <li> <a href="http://localhost:3000/updateprofile">Settings </a>
        <div className="sub-menu-1">
          <ul>
            <li> <a href="http://localhost:3000/updateprofile">Update Profile</a></li>
            <li> <a href="http://localhost:3000/deleteprofile">Delete Profile</a></li>
          </ul>
        </div>
        </li>
      <li> <a href="http://localhost:3000/contactus">Contact </a></li>
      <li> <a href="http://localhost:5000/logout">Log Out </a></li>
      </ul>
      </div>
      </body>
      </html>
      </form>
      }
       </div>) :
       (
        <div>
          {alert("You must be logged in to access this page.")}
          <Redirect to="/"></Redirect>
          </div>
       )
    }
  }
  export default Dashboard
