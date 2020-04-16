import React from 'react';
import logo from './logo.svg';
import './App.css';
import InBox from './InBox.js'
/*This class is used to fetch the users from the allRandUsers endpoint and throw back card elements*/
class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      data: "lexie"
    };
  }

  

  //connects to the endpoint and parses its response to then set this.state's data value to the response.
  componentDidMount() {
    alert("testing backend soon")
  }

  //runs a sudo for loop to iterate through the list of users it was given
  render() {
    return(
      <div>
        <h1>{this.state.data}</h1> 
        <InBox/>        
      </div>
    )
  }
}
export default App
