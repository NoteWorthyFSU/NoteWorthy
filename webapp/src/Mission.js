
import React from 'react';
import './noteworthy.css'

class Mission extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (<div>
      <form action = 'http://localhost:3000/mission' method = 'POST'>
      <html>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <body>
      <div class="contact-form">
      <br></br>
      <br></br>
      <h1> <center><font size ="20" >Mission Statement</font></center></h1>
      <br></br>
      <br></br>
      <br></br>
      <div class="mission">
        <div class="mission-box">
        <br></br>

        <p><center><font >NoteWorthy is a web application that streamlines the process of taking notes and generating study material to better help students in their classes. It will facilitate an environment that allows students to save materials and information from their classes as well as sharing them with other students.</font></center></p>
        <br></br>
        <p>Being students ourselves, we know all of the difficulties there are when it comes to productive and inclusive studying through note taking. Our motivation is to centralize and create the “best of all worlds” web app for note taking and studying in hopes of helping and encouraging students to dive deep into their education and optimize their study habits. With this in mind, we hope that with the help of our web app students can not only significantly improve their grades, but be inspired to do more, learn more, and achieve more through their studies!</p>
        </div>
        </div>

      </div>
      </body>
      </html>
      </form>
      </div>);
    }
  }
  export default Mission
