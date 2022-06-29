import { Steps } from "./main.js"

describe("basic test cases", () => {
  it("should execute function in queue", (done) => {
    const steps = new Steps({
      queue: [() => done()]
    });
    steps.start();
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
    steps.start();
  })
})
