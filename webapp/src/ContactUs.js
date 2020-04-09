/*https://www.youtube.com/watch?v=Iv93yjdvkWI*/
import React from 'react';
import './noteworthy.css'
import Dashboard from './Dashboard.js'

class ContactUs extends React.Component {

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
        <center> Need some help or have a question? </center>
      </h1>
      <br></br>
      <br></br>

      <h2 className = "loginSub">
        <center> Contact us below for support. </center>
      </h2>
        <div className = "loginBox">
          <center>
          <h4 className = "noteWorthy"> <font size = "10"color="white"> NoteWorthy</font></h4>
          <form action = 'http://localhost:3000/contactus' method = 'POST'>
                  <input className = "userInput"required type="text" name="subject" placeholder="Subject"></input>
                  <br></br>
                  <input className = "userInput"required type="text" name="message" placeholder="Message"></input>
                  <br></br>
                <button className="userInput" type="submit">Submit</button>
              </form>
              <br></br>
          </center>
        </div>
      </div>);
  }

  }
  export default ContactUs
