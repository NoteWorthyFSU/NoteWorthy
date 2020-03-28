import React from 'react';
import './noteworthy.css';

class Notes extends React.Component {

    constructor()
    {
        super();
        this.state = {
            cNotes: "",
            notes: [],
            titleSet: false,
            title: "",
            prevKey: 0
        }

    }

    render(){

        return(
        <div>
            <h1>{this.state.title}</h1>
            {this.renderList()}
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
        var temp = this.state.notes
        var list = temp.map((temp)=> <li>{temp}</li>)
        return(
            <ul className="notes">{list}</ul>
        )
    }
    tab(e)
    {
        if(e.keyCode == 9)
        {
            if(this.state.titleSet == false){
                this.setState({titleSet: true})
                var box = document.getElementById("area")
                box.value = ""
                this.setState({prevKey: e.keyCode})
            }
            if(this.state.prevKey != 9 && this.state.titleSet == true)
            {
                
                var box = document.getElementById("area")
                var temp = this.state.notes
                temp.push(box.value)
                
                this.setState({notes: temp})
                box.value = ""
                this.setState({prevKey: e.keyCode,cNotes: ""})

            }
            else{

            }
        }
        else{
            this.setState({prevKey: e.keyCode})
            
        }
    }


    update(evt){
        if(this.state.titleSet == false)
        {
            this.setState({title: evt.target.value});
        }
        else{
        this.setState({cNotes: evt.target.value});
        }
    }
}

export default Notes
