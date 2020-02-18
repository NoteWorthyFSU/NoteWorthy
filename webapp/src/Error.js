import React from 'react';
import logo from './logo.svg';
import './noteworthy.css'
import InBox from './InBox'
import Login from './Login';
/*This class is used to fetch the users from the allRandUsers endpoint and throw back card elements*/
class Error extends React.Component {
  
  constructor() {
    super();
  }
  

  //connects to the endpoint and parses its response to then set this.state's data value to the response.
  componentDidMount() {
    
  }

  //runs a sudo for loop to iterate through the list of users it was given
  render() {
    return(
      <div>
        <h1>This page doesn't exist</h1>    
      </div>
    )
  }
}
export default Error
