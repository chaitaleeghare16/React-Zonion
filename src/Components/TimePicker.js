import React, { Component } from 'react'

import M from "materialize-css/dist/js/materialize.min.js"
import { Button, Card, Row, Col } from 'react-materialize';

export class TimePicker extends Component {
    constructor(props) {
        super(props)
    
        this.state = {

            opentime:'',
            closetime:'' 
        }

        this.state.opentime=React.createRef();
        this.state.closetime=React.createRef();

    }

    handleTime=()=>
    {
        this.setState({opentime:this.opentime.currrent.value,
        closetime:this.closetime.currrent.value})
    }
    
    render() {

        
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.timepicker');
            M.Timepicker.init(elems, {
                onCloseEnd:this.handleTime
            });
          });
        return (
            <div>
                Time

                <div className="row">
                    <div className="input-field col s12">
                        <input type="text" id="opentime" className="timepicker" ref={this.state.opentime}/>
                        <label htmlFor="opentime" className="active">Open Time:</label>
                    </div>

                    <div className="row">
                    <div className="input-field col s12">
                        <input type="text" id="closetime" className="timepicker" ref={this.state.closetime}/>
                        <label htmlFor="closetime" className="active">Close Time:</label>
                    </div>

                </div>
            </div>
            </div>
        )
    }
}

export default TimePicker




