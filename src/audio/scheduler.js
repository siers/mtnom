import _ from 'lodash'
import { timerWorker, workerFromFn } from './timer'

// table's row -> [(start, end)]
const generateTrackBeats = (beats, period, length) =>
  _.flatMap(beats, (beat, idx) => {
    if (beat === '.') {
        return []
    } else {
        const start = period * (idx / beats.length)
        return [[start, start + length]]
    }
  })

const oscillate = (ctx, shift) => ([start, end]) => {
  const osc = ctx.createOscillator()
  osc.connect(ctx.destination)
  osc.frequency.value = 440

  osc.start(shift / 1000 + start / 1000)
  osc.stop(shift / 1000 + end / 1000)
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
    console.log('beat')

    const oscs = _.map(
        generateTrackBeats(this.table[0], this.period, 50),
        oscillate(this.ctx, this.nextTime))

    this.nextTime += this.period
  }

  schedule() {
    console.log('sched')

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
