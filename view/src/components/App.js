import React, { Component } from 'react';
import LeafMap from './leafMap.js'
import GeoJSON from './leafMap.js'

import helpers from './utils/helpers.js'
import './App.css';

var newArr = []
class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      data: null,
      hood: null
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

    function Geometry(coordinates) {

      this.coordinates = coordinates;


    }

    helpers.initGeoData().then(function(res) {
      if (res !== this.state.data) {
        for(let i=0; i < res.data.length; i++) {
        var coordinates = res.data[i].geometry.coordinates;

        var geometry = new Geometry(coordinates);
         newArr.push(coordinates)
        }
        this.setState({ data: newArr });
      }
    }.bind(this));
}	
  render() {
    return (
      <div className="App">
       
        <LeafMap  data={newArr} hood={this.state.hood} />
        
      </div>
    );
  }
}

export default App;















