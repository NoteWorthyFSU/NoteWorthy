/*https://www.youtube.com/watch?v=Iv93yjdvkWI*/
import React from 'react';
import './noteworthy.css'

class ContactUs extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (<div>
      <form action = 'http://localhost:3000/contactus' method = 'POST'>
      <html>
      <body>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className = "form">
        <div className = "contact-title">
        <br></br>
        <br></br>
        <br></br>
        <br></br>

          <h1> <center>Contact Us</center></h1>
          <br></br>
          <br></br>

        </div>
        <div className = "contact-form">
          <form action = 'http://localhost:3000/contactus' method = 'POST'>
            <center><input className = "form-control"required type="text" name="name" required placeholder="Your Name"></input></center>
            <br></br>
            <center><input className = "form-control"required type="text" name="email" required placeholder="Your Email"></input></center>
            <br></br>
            <center><textarea name = "message" class="form-control" placeholder="Message" row = "100" required placeholder="Your Message"></textarea></center>
            <br></br>
            <br></br>
            <center><input type= "submit" className = "form-control submit"required  value= "SEND MESSAGE"></input></center>
          </form>
        </div>
        </div>
      </body>
      </html>
      </form>
      </div>);
    }
  }
  export default ContactUs
