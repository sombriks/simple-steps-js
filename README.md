# simple-steps-js

[![npm](https://img.shields.io/npm/v/simple-steps-js?style=plastic)](https://www.npmjs.com/package/simple-steps-js)

browser library to execute functions at a given interval

## usage

```js
import { Steps } from "simple-steps-js"

const steps = new Steps({
  replay: true,
  queue:[
    () => console.log("in"),
    Steps.noop,
    () => console.log("out"),
    Steps.noop
  ]
})

steps.start()
```
