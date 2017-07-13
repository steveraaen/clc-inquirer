import React, { Component } from 'react';
import LeafMap from './leafMap.js'
import helpers from './utils/helpers.js'
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      
      hood: {},
      data: {}
    }
  }
  componentDidMount() {
    helpers.initHood().then(function(response) {
      console.log(response);
      if (response !== this.state.hood) {
        console.log("hood", response.data);
        this.setState({ hood: response.data });
      }
    }.bind(this))

    helpers.initGeoData().then(function(res) {
      console.log(res);
      if (res !== this.state.data) {
        console.log(res.data.length);
        this.setState({ data: res.data });
      }
    }.bind(this));
}
	
  render() {
    return (
      <div className="App">
       
        <LeafMap data={this.state.data} hood={this.state.hood}/>
      </div>
    );
  }
}

export default App;
