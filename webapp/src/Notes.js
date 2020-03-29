import React from 'react';
import './noteworthy.css';

class Notes extends React.Component {

    constructor()
    {
        super();
        this.state = {
            cNotes: " ",
            notes: new Map(),
            topics: [],
            currentTopic: " ",
            topicNum: 0,
            tempTitle: " ",
            currentNote: 0,
            titleSet: false,
            prevKey: 0,
            inArrow: false
        }

    }


    render(){

        return(
        <div id="main">
            <div className ="renderDiv" id="render">
                {this.renderList()}
            </div>
            <h1 id = "temptitle">{this.state.tempTitle}</h1>
            <p className="currentTopic">current Topic: {this.state.currentTopic}</p>
            <p className= "notes" id = "current">{this.state.cNotes}</p>
            <form action='http://localhost:5000/saveNotes' method="POST">
                <button type="submit">Submit</button>
                <textarea autofocus id="area" className = "noteBox" rows="50" cols="50"  
                    onChange={evt => this.update(evt)} onKeyDown={evt => this.keyIn(evt)} />
            </form>
            <input className ="grab" type="text" onFocus={function(){
                document.getElementById("area").focus()
            }}/>
        </div>)
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
            var box = document.getElementById("area")
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
