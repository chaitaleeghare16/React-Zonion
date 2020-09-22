import React, { Component } from 'react';
import {TimePicker} from 'basic-react-timepicker';
import moment from 'moment';
import 'antd/dist/antd.css';
 
class MyApp extends Component {
  state = {
    time: '10:00',
  }
 
 
  render() {
    return (
      <div>
          {this.state.time}
          <TimePicker
    
    
  />
      </div>
    );
  }
}
export default MyApp