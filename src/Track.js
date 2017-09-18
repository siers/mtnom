import _ from 'lodash'
import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'

import { addBeat, removeBeat, toggleBeat } from './actions'

class Track extends Component {
  componentDidMount() {
    const toEv = ev => Rx.Observable.fromEvent(this.root, ev)
    const [up$, down$, leave$] =
      ['up', 'down', 'leave'].map(name => toEv(`mouse${name}`))
        .map(obs =>
          obs.filter(ev =>
            ev.target.classList.contains('beat')))

    this.obs$ =
      down$.mergeMap(down =>
        Rx.Observable.of(down).delay(350).takeUntil(leave$).takeUntil(up$)
      ).subscribe(({ target: { dataset: { x, y } } }) =>
        this.props.removeBeat({ x, y })
      )
  }

  componentWillUnmount = () => this.obs$.unsubscribe()

  render() {
    const { beats } = this.props

    return (
      <div className="track" ref={el => this.root = el}>
        <div className="beats">
          {_.map(beats, (beat, y) => {
            const data = {x: this.props.i, y}
            return <a
                key={y}
                className={classNames("beat", {silent: beat === '.'})}
                {..._.mapKeys(data, (_, k) => `data-${k}`)}
                onClick={() => this.props.toggleBeat(data)}
              />
          })}
        </div>

        <a className="add-beat" onClick={() => this.props.addBeat({x: this.props.i})} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  addBeat,
  removeBeat,
  toggleBeat,
}

export default connect(() => ({}), mapDispatchToProps)(Track)
