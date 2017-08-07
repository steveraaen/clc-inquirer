import React, { Component } from 'react';
import CMarkers from './CMarkers.js'
import Map from './CMarkers.js'
import Form from './Form.js'
import helpers from './utils/helpers.js'
import day from './utils/time.js'

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      data: null,
      hoodNames: null,
      uloc: null,
      dow: day
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
/*  setDay(value) {
    this.setState = ({
      dayow: this.state.dow
    })
  } */

  render() {
    
    return (
      <div className="App">
       <div className="header">
        <Form hoodName={this.state.hoodNames}  />
       </div>
        <CMarkers keys={this.state.keys} uloc={this.state.uloc} data={this.state.data} text={this.state.text} hoodName={this.state.hoodName} latlngs={this.state.latlngs}/>

      </div>
    );
  }
}

export default App;















