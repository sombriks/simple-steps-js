import { expect } from "chai"
import { Steps } from "./main.js"

describe("basic test cases", () => {
  it("should execute function in queue", (done) => {
    const steps = new Steps({
      queue: [() => done()]
    });
    steps.start()
  })

  it("should count to five", (done) => {
    const steps = new Steps({
      delay: 100,
      queue: [
        () => 1,
        () => 2,
        () => 3,
        () => 4,
        () => 5,
        () => done(steps.lastResult != 5)
      ]
    });
    steps.start()
  })

  it("should stop", (done) => {
    const steps = new Steps({
      delay: 100,
      queue: [
        () => 1,
        () => 2,
        () => 3,
        () => 4,
        () => 5,
        () => 6
      ]
    });
    steps.start()
    setTimeout(() => {
      steps.stop()
      expect(steps.lastResult).to.equal(2)
      done()
    }, 250)
  })

  it("should add one step", (done) => {
    const steps = new Steps({
      delay: 100,
      queue: [
        () => 1,
        () => 2,
        () => 3
      ]
    });
    steps.start()
    setTimeout(() => steps.add(() => 0.5, 0), 10)
    setTimeout(() => steps.add(() => 0.5), 20)
    setTimeout(() => {
      expect(steps.queue.length).to.equal(5)
      expect(steps.lastResult).to.equal(0.5)
      done()
    }, 600)
  })

  it("should remove one step", (done) => {
    const steps = new Steps({
      delay: 100,
      queue: [
        () => 1,
        () => 2,
        () => 3
      ]
    });
    steps.start()
    setTimeout(() => steps.remove(2), 10)
    setTimeout(() => {
      expect(steps.currStep).to.be.a("undefined")
      expect(steps.lastResult).to.equal(2)
      done()
    }, 300)
  })

})
