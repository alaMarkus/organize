const wt = require("worker-thread");
const queries = require("./database/partsQuery")
const machineQueries = require("./database/machineQuery")
const {findMachineForPart, findPartsForMachine} = require("./logic/matchMachines")
 
function partWorker(partObj) {
  return new Promise(r=>{
    machineQueries.getAllMachines()
    .then(result=>{
        const validMachine = findMachineForPart(partObj,result)
        if (validMachine!=undefined){
            queries.updateValidMachine(validMachine.machineId,partObj.partId)
            .then(result2=>{
                r(result2)
            })
        }else{
            r("no valid machines")
        }
    })
  });
}

function machineWorker(machineObj){
  return new Promise(r =>{
    queries.getAllParts()
      .then(parts=>{
        const partArr = findPartsForMachine(machineObj, parts)
        console.log(partArr)
        machineQueries.getAllMachines()
          .then(machines=>{
            for(let i = 0;i<partArr.length;i++){
              const chosenMachine = findMachineForPart(partArr[i], machines)
              console.log("chosen machine for part: "+partArr[i]+"is :"+chosenMachine)
            }
          })
      })
  })
}
 
const partCh = wt.createChannel(partWorker, 10);
const machineCh = wt.createChannel(machineWorker,10);

machineCh.on("done", (err, result) => {
  if (err) {
    console.error(err);
  }
  console.log(result);
});
 
machineCh.on("stop", () => {
  console.log("channel stopped");
});

partCh.on("done", (err, result) => {
  if (err) {
    console.error(err);
  }
  console.log(result);
});
 
partCh.on("stop", () => {
  console.log("channel stopped");
});

exports.callWorker = (partObj) =>{
    console.log("called callWorker")
    partCh.add(partObj)
}
exports.callMachineWorker = (machineObj) =>{
  console.log("called machineWorker")
  machineCh.add(machineObj)
}
