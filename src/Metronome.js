import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Metronome.css'

class Metronome extends Component {
  render() {
    return (
      <div id="metronome">
        <div className="add-row" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  on: state.on
})

export default connect(mapStateToProps)(Metronome)
