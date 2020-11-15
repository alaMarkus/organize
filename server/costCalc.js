const queries = require("./database/partsQuery")
const machineQueries = require("./database/machineQuery")
const {findMachineForPart, findPartsForMachine} = require("./logic/matchMachines")
const {callWorker} = require("./background")


function cutCount(removalDiameter, cutDepth){
    return Math.ceil(removalDiameter/(cutDepth*2))
}

function calculateCost(part,machine,parameter){
    console.log("stock OD:", machine.stockOutsideDiameter)
    console.log("part OD: ",part.outsideDiameter)

    outerRemoval = machine.stockOutsideDiameter-part.outsideDiameter
    console.log("outerRemoval D: ",outerRemoval)

    numOfCuts = cutCount(outerRemoval,parameter.outsideCutDepth)
    console.log(numOfCuts)

    cutCycle(
        part.bushingLength,
        parameter.outsideRoughingSpeed,
        machine.rapidSpeed,
        parameter.outsideRoughingFeed,
        machine.stockOutsideDiameter,
        parameter.outsideCutDepth,
        numOfCuts
            )
}

function cutCycle(length,cutSpeed,rapidSpeed, feed, stockDiameter, cutDepth, cutCount){
    let diameter = stockDiameter;
    let totalTime = 0;
    const retractTime = length/rapidSpeed
    console.log("retract time: "+ retractTime*60)
    for (let i =0; i<cutCount; i++){
        diameter = diameter-cutDepth;
        const rpm = cutSpeed/(diameter/1000*3.14)
        console.log("rpm: "+rpm+" for "+i)
        const cutTime = length/(feed*rpm)
        console.log("cut time: "+cutTime)
        totalTime = totalTime+cutTime+retractTime;
        console.log("totalTime: "+totalTime*60)
    }
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