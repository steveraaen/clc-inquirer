import React, { Component } from 'react';
import CMarkers from './CMarkers.js'
import Map from './CMarkers.js'
import Form from './Form.js'

import helpers from './utils/helpers.js'
import dow from './utils/time.js'

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      data: null,
      hoodNames: null,
      uloc: null
    }
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(function(pos){
    var userLoc = []
    userLoc.push(pos.coords.latitude)
    userLoc.push(pos.coords.longitude)
    
    console.log(userLoc)
    this.setState({ uloc: userLoc})
        }.bind(this))

/*    helpers.initHood().then(function(response) {
      console.log(response.data[107].name);
      if (response !== this.state.hood) {
        var hoodCoorA = response.data[107].geometry.coordinates[0];
        var hoodName =  response.data[107].name
        hoodCoorA.pop()
        console.log(hoodCoorA)
        var hoodCoorB = hoodCoorA.map((positions, idx) => {
          return positions
        })
        console.log(hoodCoorB)
        this.setState({ latlngs: hoodCoorB,
                        hoodList: response.data,
                        hoodName: hoodName });
      }
    }.bind(this))*/
// ------------
helpers.getHoodNames().then(function(res){

          this.setState({hoodNames: res.data });
}.bind(this))
// -----------------------------------------------------
    helpers.initGeoData().then(function(res) {
      console.log(res.data)
        if (res !== this.state.data) {
          var posArr = res.data.map((coor) => { 
            return coor.geometry.coordinates 
            })
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
       <div className="header">
        <Form hoodName={this.state.hoodNames}/>
       </div>
        <CMarkers keys={this.state.keys} uloc={this.state.uloc} data={this.state.data} text={this.state.text} hoodName={this.state.hoodName} latlngs={this.state.latlngs}/>

      </div>
    );
  }
}

export default App;















