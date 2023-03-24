// src/timer/index.ts
var sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};
var timer_default = {
  sleep
};
export {
  timer_default as timer
};
