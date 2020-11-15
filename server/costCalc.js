const queries = require("./database/partsQuery")
const machineQueries = require("./database/machineQuery")
const {findMachineForPart, findPartsForMachine} = require("./logic/matchMachines")
const {callWorker} = require("./background")


function numberOfCuts(removalDiameter, cutDepth){
    return Math.ceil(removalDiameter/(cutDepth*2))
}

function calculateCost(part,machine,parameter){
    console.log("stock OD:", machine.stockOutsideDiameter)
    console.log("part OD: ",part.outsideDiameter)
    outerRemoval = machine.stockOutsideDiameter-part.outsideDiameter
    console.log("outerRemoval D: ",outerRemoval)

    numOfCuts = numberOfCuts(outerRemoval,parameter.outsideCutDepth)
    console.log(numOfCuts)

    
}



queries.getPart(1,"866bdea5-d17c-45db-8914-fe04c1677fd1")
    .then(part=>{
        console.log(part)
        console.log(part[0].validMachine)
        machineQueries.getMachine("810e9f31-d594-4f8d-88c3-bf1ad25db7ad",part[0].validMachine)
            .then(machine=>{
                console.log(machine)
                machineQueries.getParameters(1)
                    .then(parameters=>{
                        console.log(parameters)
                        calculateCost(part[0],machine[0],parameters[0])  
                    })
            })
    })