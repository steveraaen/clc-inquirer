import React, { Component } from 'react';
import LeafMap from './leafMap.js'
import Map from './leafMap.js'


import helpers from './utils/helpers.js'
import './App.css';

var posArr = [];
var childArr = [];
var featureArr = [];
var geoKeyArr = [];

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      position: null,
      texts: null,
      data: null,
      hood: null,
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
  console.log(res.data)
      if (res !== this.state.data) {
        var posArr = res.data.map((coor) => { 
          return coor.geometry.coordinates }
          )}
        var textArr = res.data.map((text) => {
          return text.properties.T
          })
        var keyArr = res.data.map((k, idx) => {
          return 'k_' + idx
          })
        var geoArr = res.data.map((geo) => {
          return geo.properties.T, geo.geometry
        })

        this.setState({coordinates: posArr,
                       texts: textArr,
                       keys: keyArr,
                       data: geoArr
                       })
      }.bind(this))
}
  render() {
    
    return (
      <div className="App">
       
        <Map data={this.state.data} text={this.state.texts} position={this.state.coordinates} hood={this.state.hood} keys={this.state.keys} />

      </div>
    );
  }
}

export default App;















