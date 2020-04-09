
import React from 'react';
import './noteworthy.css'
import Dashboard from './Dashboard.js'

class ChangePasssword extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (<div>
      <Dashboard>
      </Dashboard>
      <form action = 'http://localhost:3000/changepassword' method = 'POST'>
      <html>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <body>

      </body>
      </html>
      </form>
      </div>);
    }
  }
  export default ChangePasssword
