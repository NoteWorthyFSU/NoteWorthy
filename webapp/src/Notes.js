import React from 'react';
import './notes.css';
import Dashboard from './Dashboard.js'
import Select from 'react-select';
import Creatable, { makeCreatableSelect } from 'react-select/creatable';

let dataArray = []
let dataArray2 = []
const classesList = []
class Notes extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            cNotes: " ",
            notes: new Map,
            data: [], //topics
            data2: [],  //notes
            topics: [],
            currentTopic: " ",
            topicNum: 0,
            tempTitle: " ",
            currentNote: 0,
            titleSet: false,
            prevKey: 0,
            inArrow: false,
            className: null,
            actualClass: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClasses = this.handleClasses.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
   }

   componentWillMount()
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

   handleClasses = (newValue, actionMeta) => {
    if(newValue !== null)
    {
        this.setState({actualClass: newValue['value'] });
    }
    
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

    handleSubmit(e)
    {     
        let subject, content
        for (subject of this.state.notes.keys())
        {
            console.log(subject)
            for(content of this.state.notes.get(subject))
            {
                console.log(content)
            }
        }
    }

    handleChange(e)
    {
        this.setState({data: e.target.value})
    }
   
    render(){
        return(
        <div id="main">
        <Dashboard>
        </Dashboard>
        <Creatable className="wrapper"
            isClearable
            onChange={this.handleClasses}
            onInputChange={this.handleInputChange}
            options={classesList}
            placeholder="Pick or Create a Subject"
        />
       
            <div className ="cards" id="render">
                {this.renderList()}
            </div>
            <h1 id = "temptitle">{this.state.tempTitle}</h1>
            <p className="currentTopic">current Topic: {this.state.currentTopic}</p>
            <p className= "notes" id = "current">{this.state.cNotes}</p>
            <form action='http://localhost:5000/saveNotes' method="POST" onSubmit={this.handleSubmit}>
                <button className="savebutton" type="submit" >Save</button>
                <input type="text" name="Topics" value={this.state.data}></input>
                <br></br>
                <input type="text" name="Notes" value={this.state.data2}></input>
                <input  type="text" name="Class" value={this.state.actualClass}></input>
                <textarea autofocus id="area" className = "noteBox" rows="50" cols="50"
                    onChange={evt => this.update(evt)} onKeyDown={evt => this.keyIn(evt)} />
            </form>
            <input className ="grab" type="text" onFocus={function(){
                document.getElementById("area").focus()
            }}/>
        </div>);
    }

    doalert()
    {
      alert("Test");
    }

    renderList()
    {
        var Notes = this.state.notes
        var doc = document.getElementById("render")
        if(doc)
        {
            while(doc.firstChild)
            {
                doc.removeChild(doc.firstChild)
            }
        }

        var topics = this.state.topics
        var notes = this.state.notes
        var x
        // goes through each main topic
        for(x of topics)
        {
           var div = document.createElement("DIV")
           div.style.wordWrap="break-word"
           var title = document.createElement("H1")
           title.appendChild(document.createTextNode(x))
           div.appendChild(title)
           var subNotes = document.createElement("UL")
           subNotes.className = "notes"
           var y
           for(y of notes.get(x))
           {
                // dont forget to add wrap around
                var li = document.createElement("LI")
                li.appendChild(document.createTextNode(y))
                subNotes.appendChild(li)
           }
           div.appendChild(subNotes)
           doc.appendChild(div)
        }
    }

    keyIn(e)
    {
        if(e.keyCode == 9)
        {
            this.tab(e)
        }
        else if(e.keyCode == 38)
        {
            this.upArrow()
        }
        else
        {
            this.setState({prevKey: e.keyCode})
        }
    }


    upArrow()
    {
        //console.log("up")
        this.setState({currentNote: this.state.currentNote+1,inArrow: true})
        var notes = this.state.notes
        var cTopic = notes.get(this.state.currentTopic)
        //alert(cTopic)
        var pos
        if(cTopic){pos= cTopic.length - 1-  this.state.currentNote}
        //console.log(pos)
        if(pos < 0 && pos >= -1 && this.state.topics.length > 1 && this.state.topicNum > 1)
        {
            this.setState({currentNote: 1})
            this.setState({topicNum: this.state.topicNum-1})
            this.setState({currentTopic: this.state.topics[this.state.topicNum-2]})
            cTopic = notes.get(this.state.topics[this.state.topicNum-2])

            var toChange = cTopic[cTopic.length-1]
            this.setState({cNotes: toChange})
            document.getElementById("area").value = toChange
           // this.upArrow()
        }
        else if(pos >=0)
        {
            var toChange = cTopic[pos]
            this.setState({cNotes: toChange})
            document.getElementById("area").value = toChange
        }
        else{
            this.setState({currentNote: 0})
        }

    }


    tab(e)
    {
        if(this.state.inArrow == false)
        {
            // checks if start of topic
            if(this.state.titleSet == false){
                this.setState({tempTitle: ""});
                this.setState({titleSet: true})
                var box = document.getElementById("area")
                var temp = this.state.notes
                var temp2 = this.state.topics
                //adds to note
                temp.set(box.value,[])
                //adds to topics list
                temp2.push(box.value)
                this.setState({notes: temp,currentTopic: box.value,
                    topics: temp2,topicNum: this.state.topicNum + 1})
                box.value = ""
                this.setState({prevKey: e.keyCode})
            }
            // checks if adding note
            else if(this.state.prevKey != 9 && this.state.titleSet == true)
            {

                var box = document.getElementById("area")
                var temp = this.state.notes
                temp.get(this.state.currentTopic).push(box.value)
                this.setState({notes: temp})
                //add notes
                dataArray2.push("[" + this.state.currentTopic + "]" + box.value)
                this.setState({data2: dataArray2})
                box.value = ""
                this.setState({prevKey: e.keyCode,cNotes: ""})
                

            }
            // double tab new topic
            else{
                this.setState({titleSet: false, currentTopic: ""})
            }
        }
        else{
            // sets from arrow fix
            var notes = this.state.notes
            var cTopic = notes.get(this.state.currentTopic)
            var pos = cTopic.length - this.state.currentNote
            var temp = this.state.notes
            cTopic[pos] = box.value
            box.value = ""
            notes.set(this.state.currentTopic,cTopic)
            if(this.state.topics.length != this.state.topicNum)
            {
                this.setState({notes: notes, topicNum: this.state.topics.length,
                    currentTopic: this.state.topics[this.state.topics.length - 1]})
            }
            this.setState({notes: notes,currentNote: 0,prevKey: 0,cNotes: "",inArrow: false})

        }
    }

    update(evt){
        //add toipcs
        this.setState({data: this.state.topics})
        if(this.state.titleSet == false)
        {
            this.setState({tempTitle: evt.target.value});
        }
        else{
        this.setState({cNotes: evt.target.value});
        }
    }
}

export default Notes
