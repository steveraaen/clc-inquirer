import React, { Component } from 'react'

export default class Form extends Component {
  constructor(props) {
    super(props);
}
  componentWillReceiveProps(){
    console.log(this.props.hoodName)
    


  }
  render() {
    if(this.props.hoodName) {
      var hn = this.props.hoodName
      var hoodList = hn.map((nHood) => 
        <option key={nHood}>{nHood}</option>
        )}
    return (
      <div className="header">
      
      <select >
      {hoodList}
      </select>
        <input></input>
        <button className="btn btn-default" type="button"> Lookup </button>
        <button className="btn btn-default" type="button"> Monday  </button>
        <button className="btn btn-default" type="button"> Tuesday  </button>
        <button className="btn btn-default" type="button"> Wednesday  </button>
        <button className="btn btn-default" type="button"> Thursday  </button>
        <button className="btn btn-default" type="button"> Friday  </button>
        <button className="btn btn-default" type="button"> Saturday  </button>
          
      </div>
    )
  }
}