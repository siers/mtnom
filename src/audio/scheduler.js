import _ from 'lodash'
import { timerWorker, workerFromFn } from './timer'

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

    var osc = this.ctx.createOscillator()
    osc.connect(this.ctx.destination)
    osc.frequency.value = 440

    osc.start(this.nextTime / 1000)
    osc.stop((this.nextTime + 50) / 1000)

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
