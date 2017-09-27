import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Track from './Track.js'
import './Metronome.css'
import { addRow } from './actions'

import { timerWorker, workerFromFn } from './audio/timer'

class Metronome extends Component {
  componentDidMount() {
    this.timer = new workerFromFn(timerWorker)
    this.timer.postMessage({"msg": "start"})
    this.timer.postMessage({"msg": "interval", "data": 2000})
  }

  componentWillUnmount() {
    this.timer.postMessage({"msg": "stop"})
  }

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
