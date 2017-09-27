import _ from 'lodash'
import { timerWorker, workerFromFn } from './timer'

class Scheduler {
  // period is measured in miliseconds
  constructor(period, table) {
    this.table = table
    this.ctx = new AudioContext()

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

    // Schedule a single period ahead.
    if (this.nextTime < this.ctx.currentTime * 1000 + this.period)
      this.beat()
  }
}

export {
  Scheduler
}
