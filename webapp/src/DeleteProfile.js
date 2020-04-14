import React from 'react';
import './noteworthy.css'
import Dashboard from './Dashboard.js'

class DeleteProfile extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

 render() {
    return (<div>
      <Dashboard>
      </Dashboard>
      <div className = "loginBox">
        <center>
        <h4 className = "noteWorthy"> <font size = "10"color="white"> Do you really want to delete your account?</font></h4>
              <button className="userInput" type="submit">Yes</button>
              <br></br>
              <button className="userInput" type="submit">No</button>
            <br></br>
            <br></br>
            <br></br>
        </center>
        </div>
   </div>);
 }
}
export default DeleteProfile
