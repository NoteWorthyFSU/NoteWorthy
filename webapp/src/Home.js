import React from 'react';
import './noteworthy.css'
import { Redirect } from 'react-router-dom';
import Dashboard from './Dashboard.js'
const classesList = []

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
          subjects: new Map()
      }
      this.categoryFnc = this.categoryFnc.bind(this)
     
     }

     categoryFnc()
     {
       //onComponentWillMount will be used to parse through the data before loading the page
       Promise.all([
        //use promises to ensure fetches are completed
        //connect to backend 
        fetch('http://localhost:5000/userNotes'),
      ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) =>
          {

            //data returns 0 if there are no notes
            if(data1['data'] !== 0)
            {
                //iterate through the notes array
                for(var i = 0; i < (data1['data']['notes']).length; i++)
                {
                    //find the subject in the api response on each iteration
                    var subject = data1['data']['notes'][i][0]['subject'][0]
                    //flag to see if a subject already exsists in the dropdown to avoid duplicates 
                    var exists = false;
                    //iterate through the classeslist to see if there are any duplicates 
                    for(var j = 0; j < classesList.length; j++)
                    {
                        //if there is a duplicate set the flag to true 
                        if(classesList[j]['value'] === subject)
                        {
                            exists = true;
                        }
                    }
                    //only add the subject to the dropdown list if it doesn't exist 
                    if(exists === false) 
                    { 
                        classesList.push({'value': subject, 'label': subject})
                    }
                }
            }   
        });
     }
     componentWillMount()
     {
      this.categoryFnc()
      Promise.all([
        //use promises to ensure fetches are completed
        //connect to backend 
        fetch('http://localhost:5000/userNotes'),
      ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) =>
          {
            function check(x,y){
              console.log(y.keys())
              for (let keys of y.keys())
              {
                console.log(keys)
                if (x === keys)
                {
                  return false
                }
              }
              return true
            }
            var userNotes = []
            //data returns 0 if there are no notes
            if(data1['data'] !== 0)
            {
                let tempMap = this.state.subjects
                //iterate through the notes array
                for(var i = 0; i < (data1['data']['notes']).length; i++)
                {
                  //find the subject in the api response on each iteration
                  var subject = data1['data']['notes'][i][0]['subject'][0]
                  let tempMap = this.state.subjects
                  if(check(subject,this.state.subjects))
                  {
                   
                    tempMap.set(subject,[])
                  }
                  
                  var topicLength = [data1['data']['notes'][i][0]['subject'][1][0].length]
                  var topic = data1['data']['notes'][i][0]['subject'][1][0]//[2]['topic'][0]]//['topic'][0]]
                  //console.log(topic[0])
                  //console.log(topic[1])
                  for(var j = 0; j < topicLength; j++)
                  {
                    let tempMap2 = new Map()
                    var topic2 = topic[j]['topic']
                    var topicName = topic2[0]
                    var notes = topic2[1]
                    tempMap2.set(topicName,notes)
                    tempMap.get(subject).push(tempMap2)
                  }

                  userNotes.push(tempMap)
                  
                }
                
                //console.log(userNotes)
                
                //console.log(tempMap)
                this.setState({subjects: tempMap})
            }   
        });
        
     }
     
   
     render() {
      //console.log(this.state.subjects)
      const allNotes = []

      for (let [subject,value] of this.state.subjects) {
        let tmp = []
        const topics = []
        //console.log(subject)
        for(let x of value)
        {
          for(let [key, v] of x)
          {
            const noteLines = []
            //console.log(key)
            for(let z of v)
            {
              noteLines.push(<h1 className="note">{z}</h1>)
              //console.log(z)
            }
            topics.push(<div><h1 className="topic">{key}</h1>{noteLines}</div>)
          }  
        }
        allNotes.push(<div><h1 className="subject">{subject}</h1>{topics}<br></br></div>)
      }
      
      
        return (
          <div>
          <Dashboard>
          </Dashboard>
        {/*alert((this.state.subjects).size)*/}
         {allNotes}
          
              <div class="noteworthy" id ="classes">
                  <img src={require('./mac-folder-icons-51.png')} />
                  <button class="btn" >Add class</button>
                  {/*onclick = {alert("hahah")*/}
                  
              </div>

        {/*alert(this.state.subjects.keys())*/}
                {this.items}
              

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