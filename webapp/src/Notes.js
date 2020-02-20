import React from 'react';
import './noteworthy.css';
import InBox from './InBox';
/*
function  tabs ()
{
    document.body.addEventListener('keydown', function(e) {
        if(e.keyCode === 9)
        {
            alert("3223")
            return (<div><h1>Poop</h1></div>);
        }
       return null
    });
}*/

var cN = "poop";
class Notes extends React.Component {
    constructor(){
        super();
        this.state = {
            Title: "temp",
            Notes: [],
            currentNotes: "fart",
            lastUpdate: new Date().getSeconds(),
            totalNotes: 0 
        }
       // this.tabs = this.tabs.binds(this);
    }
    getCN()
    {
        return cN;
    }
    handle(e){
        alert("handle");
        this.setState({currentNotes: e.target.value});
    }
   
    render(){
        return (<div id="main" ref="main">
            <h1>{this.state.title}</h1>
            <form >        
                <input type="hidden" id="temp" onKeyDown={function(e)
                {
                    let notes = document.getElementById("currentNotes");
                    notes.textContent = e.target.value;
                }} />
                 {this.tabs()}
                <input type="text" id = "current" name="Hold" placeholder={this.state.Notes}
                 onBlur={evt => this.update(evt)}/>       
            </form>
           
            <p id="currentNotes"> </p>

        </div>);   
    }

    tabs(){
        console.log(this.state.totalNotes);
        function check(e)
        {
            //alert(e.keyCode)
            if(e.keyCode ===  9)
             {
                // minimizes previous
               
                var prev= document.getElementById("current")
                prev.setAttribute("value","");
                prev.setAttribute("id","used");
                prev.setAttribute("type","image");    
                prev.setAttribute("width","100");  
                prev.setAttribute("ref","prev");  
                var div= document.getElementById("main")
                let templet = document.getElementById("temp");
                let newIn = document.createElement("input")
                newIn = Object.assign(newIn, templet);
                //let newIn = document.createElement("input")
                var b = document.createElement("br");
                newIn.setAttribute("type","text");
                newIn.setAttribute("id","current");
                newIn.setAttribute("ref","current");
                /*newIn.addEventListener("onChange",function(e)
                {
                    var form = document.getElementById("main")
                    //let notes = document.createElement("p")

                    //notes.textContent = e.target.value;
                    let notes = document.createTextNode(e.target.value);
                    alert(notes)
                    form.appendChild(notes);
                })*/
                var form = document.getElementById("main")
                let notes = document.getElementById("currentNotes");
                notes.textContent = " ";
                
                form.appendChild(b);

                form.appendChild(newIn);
                //alert("appended")
                div.removeEventListener('keydown',e=>check(e));
                //alert("removed")
             }
        }
        var temp= document.getElementById("current")
        var main= document.getElementById("main")

        // Only creates new note if current note isnt empty or if
        // theres only header
        if(temp != null && this.state.lastUpdate != new Date().getSeconds() )
        {
            if(temp.value != "")
            {
                var t = this.state.totalNotes + 1;
                
                main.addEventListener('keydown', e => check(e));
                //alert("done")
                //var cur= document.getElementById("current")
                
                this.setState({lastUpdate: new Date().getSeconds()})
                this.setState({totalNotes: t});
                
            }
                }
     }
    cnUpdate(evt){
       // React.findDomNode(this.refs.current)
        
        //this.setState({currentNotes: })
    } 
    
    update(evt){
        this.setState({title: evt.target.value});
        

    }
}
export default Notes