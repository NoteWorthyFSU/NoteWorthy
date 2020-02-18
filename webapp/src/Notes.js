import React from 'react';
import './noteworthy.css'
import InBox from './InBox'

class Notes extends React.Component {

    constructor(){
        super();
        this.state = {
            Title: "",
            Notes: []
        }
    }

    render(){
        return (<div>
            <h1>{this.state.title}</h1>
            <form >
               <input type="text" id = "in" name="Hold" placeholder={this.state.Notes}
                 onBlur={evt => this.update(evt)}/>
                <script>
                    if({this.state.tile} != {""})
                    {
                        <InBox/>
                    }
                </script>
            </form>
            
            <p> {this.state.Notes}</p>
        </div>);   
    }
    update(evt){
        this.setState({title: evt.target.value});
        return <InBox/>
    }
}
export default Notes