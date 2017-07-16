import React, { Component } from 'react';
import LeafMap from './leafMap.js'
import GeoJSON from './leafMap.js'

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
      coordinates: null,
      children: null,
      data: null,
      hood: null,
      geoKey: null
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

    function MakePos(coordinates) {
      this.coordinates = coordinates;
    }
    function MakeChild(children) {
      this.children = children;
    }
   function MakeGeoKey(children) {
      this.children = children;
    }
    function FeatureCollection(position, children, geoKey) {
      this.position = position;
      this.children = children;
      this.json = position;
      this.geoKey = geoKey;
    }

    helpers.initGeoData().then(function(res) {
      if (res !== this.state.data) {
        for(let i=0; i < res.data.length; i++) {
        var position = res.data[i].geometry.coordinates;
        var children = res.data[i].properties.T;
        var geoKey = 'k_' + [i];
        var pos = new MakePos(position);
        var child = new MakeChild(children);
        var feature = new FeatureCollection(position, children);
        var geoKey = new MakeGeoKey(geoKey);
         posArr.push(pos);
         childArr.push(child);
         featureArr.push(feature);
         geoKeyArr.push(geoKey);
        }
       


        console.log(posArr)
        this.setState({ json: posArr,
                        children: childArr,
                        data: featureArr,
                        geoKey: geoKeyArr,
                        position: posArr
                         });
      }
    }.bind(this));
}	
  render() {
    console.log(this.state.data)
    return (
      <div className="App">
       
        <LeafMap data={this.state.json} markers={this.state.data} children={this.state.children} position={this.state.position} hood={this.state.hood} geoKey={this.state.geoKey} />
        
      </div>
    );
  }
}

export default App;















