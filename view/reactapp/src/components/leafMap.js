import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, PropTypes as MapPropTypes, GeoJSON } from 'react-leaflet'
import PropTypes from 'prop-types'


export default class LeafMap extends Component {
  constructor(props) {
    super(props)
  
  this.state = {
  lat: 40.650002,
  lng: -73.949997,
  zoom: 13, 
  data: this.props.dat
  }
}

componentDidMount() {
// ---------------------------------------------
this.state = {
   nearField: {
     $near: {
       $geometry: {
          type: "Point" ,
          coordinates: [ this.state.lng , this.state.lat ]
       },
       $maxDistance: 500,
       $minDistance: 50
     }
   }
}
console.log(this.state.nearField)
var makers = this.props.dat;
var  mgj = new GeoJSON(makers);
}

  render() {
    const center = [this.state.lat, this.state.lng]
    return (
      <Map center={center} zoom={this.state.zoom}>
        <TileLayer

          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
       <GeoJSON data={this.state.data} style={this.getStyle}/>
      </Map>
    )
  }
}