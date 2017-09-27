import _ from 'lodash'
import { timerWorker, workerFromFn } from './timer'

// table's row -> [(start, end)]
const generateTrackBeats = (beats, period, length) =>
  _.flatMap(beats, (beat, idx) => {
    if (beat === '.') {
        return []
    } else {
        const start = period * (idx / beats.length)
        const color = idx === 0 ? 880 : 440
        return [[color, start, start + length]]
    }
  })

const mapTime = f => ([color, start, end]) =>
    [color, f(start), f(end)]

const oscillate = (ctx, shift) => ([color, start, end]) => {
  const osc = ctx.createOscillator()
  osc.connect(ctx.destination)
  osc.frequency.value = color

  osc.start(start)
  osc.stop(end)
  return osc
}

class Scheduler {
  // period is measured in miliseconds
  // assuming the this.ctx.currentTime starts from 0
  constructor(period, table) {
    this.table = table

    this.nextTime = 0
    this.period = period
    this.schedahead = Math.floor(period / 4)

    this.timer = new workerFromFn(timerWorker)
    this.timer.onmessage = () => this.schedule()

    this.timer.postMessage({"msg": "start"})
    this.timer.postMessage({"msg": "interval", "data": this.schedahead})
  }

  beat() {
    _(this.table)
      .flatMap(row => generateTrackBeats(row, this.period, 50))
      .map(mapTime(beat => (this.nextTime + beat) / 1000))
      .map(oscillate(this.ctx))
      .value()

    this.nextTime += this.period
  }

  schedule() {
    // Because it takes some time for the interval worker to start up,
    // let's initialize AudioContext late, so we won't start when it's
    // currentTime is 0.5 already.
    this.ctx = this.ctx || new AudioContext()

    // Schedule a single period ahead.
    if (this.nextTime < this.ctx.currentTime * 1000 + this.period)
      this.beat()
  }
}

export {
  Scheduler
}
