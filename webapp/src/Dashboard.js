/*https://www.youtube.com/watch?v=wHFflWvii3M*/
import React from 'react';
import './noteworthy.css'

class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (<div>
      <form action = 'http://localhost:5000/dashboard' method = 'POST'>
      <html>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <body>
      <div className = "menu-bar">
      <ul>
      <li> <a href="#">Home</a> </li>
      <li> <a href="#">About Us </a>
      <div className="sub-menu-1">
        <ul>
          <li> <a href="#">Mission </a></li>
          <li> <a href="#">Vision</a></li>
          <li> <a href="#">Meet Our Team</a></li>
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
            <li> <a href="#">Update Profile</a></li>
            <li> <a href="#">Change Password</a></li>
          </ul>
        </div>
        </li>
      <li> <a href="#">Contact </a>
      <div className="sub-menu-1">
        <ul>
          <li> <a href="#">Get Support</a></li>
        </ul>
      </div>
      </li>
      <li> <a href="#">Log Out</a></li>
      </ul>
      </div>
      </body>
      </html>
      </form>
      </div>);
    }
  }
  export default Dashboard
