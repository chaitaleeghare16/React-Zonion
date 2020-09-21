import React, { Component } from 'react';
import {TimePicker} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
 
class MyApp extends Component {
  state = {
    time: '10:00',
  }
 
 // onChange = (time,timestring) => this.setState({ time })
 

  onChange=(time, timeString) =>{
    console.log(time, timeString);
  }
  render() {
    return (
      <div>
          {this.state.time}
          <TimePicker
    onChange={this.onChange}
    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
  />
      </div>
    );
  }
}
export default MyApp