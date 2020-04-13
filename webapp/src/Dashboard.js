/*https://www.youtube.com/watch?v=wHFflWvii3M*/
import React from 'react';
import './noteworthy.css'
import {Redirect} from 'react-router-dom'

class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {isLoggedIn: ""}
  }

  componentDidMount() 
  {
    const axios = require('axios');
    const axiosWithCookies = axios.create({
      withCredentials: true
    });
    //connects to the login endpoint and reads the session cookie to see if the user is logged in to gain access to the cards page
    axiosWithCookies.get(`http://localhost:5000/isLoggedIn`)
        .then((response) => {
            this.setState({isLoggedIn: JSON.stringify(response.data['data'])})
            //alert(this.state.isLoggedIn)
        }).catch((error) => {
            alert("There was an error connecting to the api")
            console.error(error);
        });
    // Promise.all([
    //   fetch('http://localhost:5000/isLoggedIn'),
    // ])
    //   .then(([res1]) => Promise.all([res1.json()]))
    //   .then(([data1]) => 
    //     {  
    //       this.setState({
    //         isLoggedIn: data1['data']
    //       })
    //   });   

  }
  render() {
    return 
    (<div>
      <form action = 'http://localhost:3000/dashboard' method = 'POST'>
      <html>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <body>
      <div className = "menu-bar">
      <ul>
      <li> <a href="http://localhost:3000/dashboard">Home</a> </li>
      <li> <a href="#">About Us </a>
      <div className="sub-menu-1">
        <ul>
          <li> <a href="http://localhost:3000/mission">Mission + Vision </a></li>
          <li> <a href="http://localhost:3000/meetourteam">Meet Our Team</a></li>
        </ul>
      </div>
      </li>
      <li> <a href="#">Classes </a>
      <div className="sub-menu-1">
        <ul>
          <li class ="hover-me"> <a href="#">Biology 1 </a> <i class="fa fa-angle-right"></i>
          <div className="sub-menu-2">
            <ul>
              <li> <a href="#">Note #1 </a></li>
              <li> <a href="#">Note #2</a></li>
              <li> <a href="#">Note #3</a></li>
            </ul>
          </div>
          </li>
          <li class ="hover-me"> <a href="#">Programming Languages</a><i class="fa fa-angle-right"></i>
          <div className="sub-menu-2">
            <ul>
              <li> <a href="#">Note #1 </a></li>
              <li> <a href="#">Note #2</a></li>
              <li> <a href="#">Note #3</a></li>
            </ul>
          </div>
          </li>
          <li class ="hover-me"> <a href="#">Spanish 3</a><i class="fa fa-angle-right"></i>
          <div className="sub-menu-2">
            <ul>
              <li> <a href="#">Note #1 </a></li>
              <li> <a href="#">Note #2</a></li>
              <li> <a href="#">Note #3</a></li>
            </ul>
          </div>
          </li>
          <li class ="hover-me"> <a href="#">Software Engineering</a><i class="fa fa-angle-right"></i>
          <div className="sub-menu-2">
            <ul>
              <li> <a href="#">Note #1 </a></li>
              <li> <a href="#">Note #2</a></li>
              <li> <a href="#">Note #3</a></li>
            </ul>
          </div>
          </li>
        </ul>
      </div>
      </li>
      <li> <a href="#">Settings </a>
        <div className="sub-menu-1">
          <ul>
            <li> <a href="http://localhost:3000/updateprofile">Update Profile</a></li>
          </ul>
        </div>
        </li>
      <li> <a href="http://localhost:3000/contactus">Contact </a>
      <div className="sub-menu-1">
        <ul>
          <li> <a href="http://localhost:3000/contactus">Get Support</a></li>
        </ul>
      </div>
      </li>
      <li> <a href="http://localhost:3000/login">Log Out </a></li>
      </ul>
      </div>
      </body>
      </html>
      </form>
      {alert(this.state.isLoggedIn)} </div>) 
    }
  }
  export default Dashboard
