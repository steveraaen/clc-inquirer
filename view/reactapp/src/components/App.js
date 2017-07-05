import React, { Component } from 'react';
import LeafMap from './leafMap.js';
import helpers from './utils/helpers.js'
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dat: helpers.getSigns()
		}

	}
  render() {
    return (
      <div className="App">
      
        <LeafMap dat={this.state.dat}/>
      </div>
    );
  }
}

export default App;
