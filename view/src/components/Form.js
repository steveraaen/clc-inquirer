import React, { Component } from 'react'




export default class Form extends Component {
  constructor(props) {
    super(props);
}

  render() {

    return (
      <div className="header">
        <button> Monday  </button>
        <button> Tuesday  </button>
        <button> Wednesday  </button>
        <button> Thursday  </button>
        <button> Friday  </button>
        <button> Saturday  </button>
          
      </div>
    )
  }
}