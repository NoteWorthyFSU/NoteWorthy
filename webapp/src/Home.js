import React from 'react';
import './noteworthy.css'
import { Redirect } from 'react-router-dom';
import Dashboard from './Dashboard.js'

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
          

      }
     }

   
    render() {
        return (
          <div>
          <Dashboard>
          </Dashboard>

              <div class="noteworthy" id ="classes">
                  <img src={require('./mac-folder-icons-51.png')} />
                  <button class="btn" onclick = {alert("hahah")}>Add class</button>
              </div>

          </div>
        )
    }
    addClass(){
      let div = document.getElementById("classes")
      alert("hello")
      if(div)
      {
        let b = document.createElement("BUTTON") 
        div.appendChild(b)
      }
    }
}
export default Home
