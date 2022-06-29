/**
 * Steps library to run a queue of function into a given delay
 * between each execution
 *
 */
export class Steps {
  constructor(config) {
    if (!config) throw new Error("must specify config with ")
    this.delay = config.delay || 1000
    this.queue = config.queue
    if (!this.queue) this.queue = config.queue = []
    if (config.duration) this.duration = config.duration
    if (config.replay) this.replay = config.replay
  }

  start() {
    this.stop()
    this.idx = 0
    this.currStep = setInterval(() => {
      this.lastResult = this.queue[this.idx]()
      this.idx++
      if (this.queue.length === this.idx) {
        if (this.replay) this.idx = 0
        else this.stop()
      }
    }, this.delay)
  }
  stop() {
    clearInterval(this.currStep)
    delete this.currStep
  }
  onFinish(fn) {
    fn(this)
  }
  add(step) { }
  remove(i) { }
}

Steps.noop = () => { }
