import React, { Component } from 'react';
import CMarkers from './CMarkers.js'
import Map from './CMarkers.js'

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
      positions: null,
      data: null,
      bronx: null
    }
  }

  componentDidMount() {


    helpers.initHood().then(function(response) {
      console.log(response);
      if (response !== this.state.hood) {

        var hooda = response.data[0].geometry.coordinates
        console.log(Array.isArray(hooda[0]));

         hooda.map((h) => {
          return hooda[1] , hooda[0]
        })
        console.log(hooda)
        this.setState({ positions: hooda[0] });
      }
    }.bind(this))

helpers.initGeoData().then(function(res) {
  console.log(res.data)
      if (res !== this.state.data) {
        var posArr = res.data.map((coor) => { 
          return coor.geometry.coordinates 
        }
          )
        var textArr = res.data.map((text) => {
          return text.properties.T
          })
        var keyArr = res.data.map((k, idx) => {
          return 'k_' + idx
          })
        var geoArr = res.data.map((geo) => {
          return geo
        })}

        this.setState({ keys: keyArr,
                        data: res.data,
                        text: textArr
        })
      }.bind(this))
}
  render() {
    
    return (
      <div className="App">
       
        <CMarkers keys={this.state.keys}  data={this.state.data} text={this.state.text} positions={this.state.positions}/>

      </div>
    );
  }
}

export default App;















