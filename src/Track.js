import _ from 'lodash'
import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { toggleBeat } from './actions'

class Track extends Component {
  render() {
    const { beats } = this.props

    return (
      <div className="track">
        <div className="beats">
          {_.map(beats, (beat, j) => (
            <a
              key={j}
              className={classNames("beat", {silent: beat === '.'})}
              onClick={() => this.props.toggleBeat({x: this.props.i, y: j})}
            />
          ))}
        </div>
        <div className="add-beat" />
      </div>
    )
  }
}

const mapDispatchToProps = {
  toggleBeat
}

export default connect(() => ({}), mapDispatchToProps)(Track)
