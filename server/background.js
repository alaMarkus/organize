const wt = require("worker-thread");
 
function worker(n) {
  return new Promise(some=>{
      some("sting"+ n)
  }
  );
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
while(i < 10) {
  ch.add(i++);
}