import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Track from './Track.js'
import './Metronome.css'
import { addRow } from './actions'

class Metronome extends Component {
  render() {
    const { table } = this.props

    return (
      <div id="metronome">
        <div className="list">
          {_.map(table, (beats, i) =>
            <Track key={i} beats={beats} i={i} />)
          }
        </div>

        <a className="add-row" onClick={() => this.props.addRow()} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  on: state.on,
  table: state.table,
})

const mapDispatchToProps = {
  addRow
}

export default connect(mapStateToProps, mapDispatchToProps)(Metronome)
