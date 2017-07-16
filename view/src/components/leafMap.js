import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON, PropTypes as MapPropTypes} from 'react-leaflet'
import L from 'leaflet'
  var map = Map
console.log(map)

export default class LeafMap extends Component {
  constructor(props) {
    super(props) ; 
      this.state = {
      lat: 40.650002,
      lng: -73.949997,
      zoom: 13
  }
}


componentDidMount() {

  }



  render() {


    function getStyle(feature, layer) {
     return {
       color: '#006400',
       weight: 5,
       opacity: 0.65
     }
   }
    const center = [this.state.lat, this.state.lng];
  console.log(this.props)
    return (

      <Map center={center} zoom={this.state.zoom}>      
        <TileLayer

          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://api.mapbox.com/styles/v1/sraaen/cj52ii4g62aqy2so4s6zbl9g9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3JhYWVuIiwiYSI6ImNqMmt2Y3k4djAwNGczM3IzaWU1a3E1eW8ifQ.dTGNBuW1jqOckGIAEDOUZw"
        />       

      </Map>

    )
  }
}