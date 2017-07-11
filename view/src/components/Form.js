import React, { Component } from 'react'
import LeafMap from './leafMap.js';



export default class Form extends Component {
  constructor(props) {
    super(props);
}

  render() {

    return (
      <div className="header">
        <button  />
          <LeafMap />
      </div>
    )
  }
}