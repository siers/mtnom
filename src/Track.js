import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { addRow } from './actions'

class Track extends Component {
  render() {
    const { beats } = this.props

    return (
      <div className="track">
        <div className="beats">
          {_.map(beats, (beat, i) => (
            <div key={i} className="beat">{beat}</div>
          ))}
        </div>
        <div className="add-beat" />
      </div>
    )
  }
}

const mapDispatchToProps = {}

export default connect(() => ({}), mapDispatchToProps)(Track)
