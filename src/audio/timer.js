// kudos https://github.com/cwilso/metronome
const timerWorker = () => {
  var id = null
  var interval = 100

  self.onmessage = ({ data: { msg: message, data } }) => {
    const start = () => { id = setInterval(() => postMessage('tick'), interval) }
    const clear = () => { id = clearInterval(id) }

    message === 'stop' && clear()
    message === 'start' && start()

    message === 'interval' &&
      (interval = data) && id && (clear() || start())
  }
}

const workerFromFn = fn => {
  const blobURL = URL.createObjectURL(
    new Blob(['(', fn.toString(), ')()' ],
    {type: 'application/javascript'})
  )

  const worker = new Worker(blobURL)
  URL.revokeObjectURL(blobURL)

  return worker
}

export {
  timerWorker,
  workerFromFn,
}
