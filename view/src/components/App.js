import React, { Component } from 'react';
import LeafMap from './leafMap.js'
import helpers from './utils/helpers.js'
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: helpers.getGeoData(), 
		}

  }
componentDidMount() {
  helpers.getGeoData()

}

	
  render() {
    return (
      <div className="App">
       
        <LeafMap data= {this.res} />
      </div>
    );
  }
}

export default App;
