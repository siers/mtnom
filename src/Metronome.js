import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Track from './Track.js'
import './Metronome.css'
import { addRow } from './actions'

import { Scheduler } from './audio/scheduler'

class Metronome extends Component {
  componentDidMount() {
    this.scheduler = new Scheduler(2000, this.props.table)
  }

  componentWillUnmount() {
    this.timer.postMessage({"msg": "stop"})
  }

  componentDidUpdate() {
    this.scheduler.table = this.props.table
  }

  render() {
    const { table } = this.props

    return (
      <div id="metronome" onClick={() => this.scheduler.ctx.resume()}>
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
