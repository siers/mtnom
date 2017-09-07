import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Metronome.css'
import { addRow } from './actions'

class Metronome extends Component {
  render() {
    return (
      <div id="metronome">
        <a className="add-row" onClick={() => this.props.addRow()} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  on: state.on
})

const mapDispatchToProps = {
  addRow
}

export default connect(mapStateToProps, mapDispatchToProps)(Metronome)
