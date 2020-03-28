import React from 'react';
import './noteworthy.css';

class Notes extends React.Component {

    constructor()
    {
        super();
        this.state = {
            cNotes: "",
            notes: new Map(),
            topics: [],
            currentTopic: "",
            tempTitle: "",
            currentNote:1,
            titleSet: false,
            prevKey: 0
        }

    }

    render(){

        return(
        <div id="main">
            <div id="render">
                {this.renderList()}
            </div>
            <h1 id = "temptitle">{this.state.tempTitle}</h1>
            <p className="notes">{this.state.cNotes}</p>
            <form>
                <textarea autofocus id="area" className = "noteBox" rows="50" cols="50"  
                    onChange={evt => this.update(evt)} onKeyDown={evt => this.tab(evt)} />
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
           var title = document.createElement("H1")
           title.appendChild(document.createTextNode(x))
           div.appendChild(title)
           var subNotes = document.createElement("UL")
           subNotes.className = "notes"
           //subNotes.style = " word-wrap:break-word;"
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

    tab(e)
    {
        if(e.keyCode == 9)
        {
            // checks if start of topic
            if(this.state.titleSet == false){
                this.setState({tempTitle: ""});
                this.setState({titleSet: true})
                var box = document.getElementById("area")
                var temp = this.state.notes
                var temp2 = this.state.topics
                temp.set(box.value,[])
                temp2.push(box.value)
                this.setState({notes: temp,currentTopic: box.value,
                    topics: temp2})
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
            this.setState({prevKey: e.keyCode})
            
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
