const wt = require("worker-thread");
 
function worker(n) {
  return new Promise(r => {
    const second = Math.floor((Math.random() * 6));
    setTimeout(() => r(`delay ${second}s: ${n}`), second * 1000);
  });
}
 
const ch = wt.createChannel(worker, 10);
 
ch.on("done", (err, result) => {
  if (err) {
    console.error(err);
  }
 
  console.log(result);
});
 
ch.on("stop", () => {
  console.log("channel is stop");
});
 
let i = 0;
while(i < 12) {
  ch.add(i++);
}