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

    this.hold$ =
      down$.mergeMap(down =>
        Rx.Observable.of(down).delay(350).takeUntil(leave$).takeUntil(up$)
      )

    this.click$ =
      down$.mergeMap(down =>
        Rx.Observable.of(down)
          .mergeMap(() => up$.take(1))
          .takeUntil(this.hold$)
      )

    const toAction = action => ev =>
      this.props[action](Object.assign({}, ev.target.dataset))

    this.hold$.do(console.log)
    this.hold$.subscribe(toAction('removeBeat'))
    this.click$.subscribe(toAction('toggleBeat'))
  }

  componentWillUnmount() {
    this.hold$.unsubscribe()
    this.click$.unsubscribe()
  }

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
