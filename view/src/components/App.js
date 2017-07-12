import React, { Component } from 'react';
import LeafMap from './leafMap.js'
import helpers from './utils/helpers.js'
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      data: {}
    }
  }
  componentWillMount() {
    helpers.getGeoData().then(function(response) {
      console.log(response);
      if (response !== this.state.data) {
        console.log("data", response.data);
        this.setState({ data: response.data });
      }
    }.bind(this));
}
	
  render() {
    return (
      <div className="App">
       
        <LeafMap />
      </div>
    );
  }
}

export default App;
