const queries = require("./database/partsQuery")
const {findMachineForPart, findPartsForMachine} = require("./logic/matchMachines")
const {callWorker} = require("./background")

const machine = {
    machineId: 2,
    userId: 1,
    machineName: 'haas',
    post: 1,
    minLength: 30,
    maxLength: 100,
    minOutsideDiameter: 40,
    maxOutsideDiameter: 80,
    minInsideDiameter: 35,
    maxInsideDiameter: 70,
    stockOutsideDiameter: 85,
    stockInsideDiameter: 30
}

queries.getAllParts()
    .then(parts=>{
        for(let i=0; i<parts.length; i++){
            callWorker(parts[i])
        }
    })
