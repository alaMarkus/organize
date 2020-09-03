function validDimension(min, max, value){
    console.log("min: "+min+" max: "+max+" value: "+ value)
    if (min<value&&value<max){
        return true;
    }else{
        return false;
    }
}

function chooseMachine(part, validMachines){
    let chosenMachine;
    let chosenRemovalRate;
    for(i = 0; i<validMachines.length; i++){
        console.log("stock outside diameter: "+validMachines[i].stockOutsideDiameter)
        console.log("part outside diameter: "+ part.outsideDiameter)
        const outsideDifference = validMachines[i].stockOutsideDiameter-part.outsideDiameter
        console.log("stock inside diameter: "+validMachines[i].stockInsideDiameter)
        console.log("part inside diameter: "+ part.insideDiameter)
        const insideDifference = part.insideDiameter-validMachines[i].stockInsideDiameter
        const removalRate = outsideDifference+insideDifference;
        console.log(validMachines[i].machineName)
        console.log("removalrate: "+ removalRate)

        if(removalRate<chosenRemovalRate||chosenRemovalRate===undefined){
            chosenRemovalRate = removalRate
            chosenMachine = validMachines[i]
        }
    }
    return chosenMachine;
}

const findMachineForPart = (part, machines) =>{
    let validMachines = []
    console.log("machines: ")
    console.log(machines)
    console.log("part: ")
    console.log(part)
    for (let i = 0; i<machines.length; i++){
            const machineId = machines[i].machineId
            const userId = machines[i].userId
            const machineName = machines[i].machineName
            const minLength = machines[i].minLength
            const maxLength = machines[i].maxLength
            const minOutsideDiameter = machines[i].minOutsideDiameter
            const maxOutsideDiameter = machines[i].maxOutsideDiameter
            const minInsideDiameter = machines[i].minInsideDiameter
            const maxInsideDiameter = machines[i].maxInsideDiameter

            if (validDimension(minLength,maxLength,part.bushingLength)&&
                validDimension(minOutsideDiameter,maxOutsideDiameter, part.outsideDiameter)&&
                validDimension(minInsideDiameter,maxInsideDiameter,part.insideDiameter)){
                console.log("machine: "+ machineId + " is valid for part: "+ part.partId)
                validMachines.push(machines[i])
            }else{
                console.log("cant do")
            }
    }
    console.log("valid machines: ")
    for (i=0; i<validMachines.length;i++){
        console.log(validMachines[i].machineName)
    }
    const chosenMachine = chooseMachine(part, validMachines)
    return chosenMachine
}



exports.findMachineForPart = findMachineForPart;
