import React from 'react';
import './noteworthy.css'
class InBox extends React.Component {

    constructor() {
        super();
        this.state = {
            focused: false,
            notes: "Notes"
        }
    }

    
    render() {
        return (<div>
            <form >
               <input type="text" id = "in" name="Hold" placeholder={this.state.notes}
                 onChange={evt => this.update(evt)}/>
            </form>
            <p> {this.state.notes}</p>
        </div>);   
    }
    update(evt){
        this.setState({notes: evt.target.value});
    }
}
export default InBox