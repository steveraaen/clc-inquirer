import React, { Component } from 'react'
import { Map, TileLayer, CircleMarker, Polygon, Popup, Tooltip, GeoJSON, PropTypes as MapPropTypes} from 'react-leaflet'
import L from 'leaflet'

export default class CMarkers extends Component {
  constructor(props) {
    super(props) ; 
      this.state = {
      lat: 40.650002,
      lng: -73.949997,
      zoom: 15
  }

  }

pointToLayer(feature, latlng) {
  return L.circleMarker(latlng, {radius:1});
}

  render() {
    const center = [this.state.lat, this.state.lng];


    return (
      <Map  center={center} zoom={this.state.zoom}> 

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/sraaen/cj52ii4g62aqy2so4s6zbl9g9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3JhYWVuIiwiYSI6ImNqMmt2Y3k4djAwNGczM3IzaWU1a3E1eW8ifQ.dTGNBuW1jqOckGIAEDOUZw"
        />
        <GeoJSON  key={this.props.keys} data={this.props.data}  pointToLayer={this.pointToLayer.bind(this)} />

        
      </Map>
    )
  }
}