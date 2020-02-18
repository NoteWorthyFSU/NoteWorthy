import React from 'react';
import logo from './logo.svg';
import './noteworthy.css'
import InBox from './InBox'
import Login from './Login';
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
    fetch('http://localhost:5000/testApi')
    .then(results => results.json())
    .then(response => {
      this.setState({data: response.data})
    })
  }

  //runs a sudo for loop to iterate through the list of users it was given
  render() {
    return(
      <div>
        <h1 className="orlando">{this.state.data}</h1>     
      </div>
    )
  }
}
export default App
