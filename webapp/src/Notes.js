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
class Notes extends React.Component {

    constructor(){
        super();
        this.state = {
            Title: "temp",
            Notes: [],
            currentNotes: "",
            lastUpdate: new Date().getSeconds(),
            totalNotes: 0 
        }
       // this.tabs = this.tabs.binds(this);
    }
    
   
    render(){
        return (<div id="main">
            <h1>{this.state.title}</h1>
            <form >
               <input type="text" id = "current" name="Hold" placeholder={this.state.Notes}
                 onBlur={evt => this.update(evt)} />       
                 
            </form>
            {this.tabs()}
            <p> {this.state.Notes}</p>
        </div>);   
    }
    tabs(){
        console.log(this.state.totalNotes);
        function check(e)
        {
            //alert(e.keyCode)
            if(e.keyCode ===  9)
             {
                temp.setAttribute("id","used")
                
                var newIn = document.createElement("input");
                newIn.setAttribute("type","text");
                newIn.setAttribute("id","current");
                var form = document.getElementById("main")
                form.appendChild(newIn);
                //alert("appended")
                main.removeEventListener('keydown',e=>check(e));
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
                this.setState({lastUpdate: new Date().getSeconds()})
                this.setState({totalNotes: t});
                
                
            }
                }
     }
    
    update(evt){
        this.setState({title: evt.target.value});

    }
}
export default Notes