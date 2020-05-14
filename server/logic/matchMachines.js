function validDimension(min, max, value){
    if (min<value&&value<max){
        return true;
    }else{
        return false;
    }
}
const findMachineForPart = (part, machines) =>{
    let validMachines = []
    console.log("machines: ")
    console.log(machines)
    console.log("part: ")
    console.log(part[0])
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

            if (validDimension(minLength,maxLength,part[0].bushingLength)&&
                validDimension(minOutsideDiameter,maxOutsideDiameter, part[0].outsideDiameter)&&
                validDimension(minInsideDiameter,maxInsideDiameter,part[0].insideDiameter)){
                console.log("machine: "+ machineId + " is valid for part: "+ part[0].partId)
                validMachines.push(machineId)
            }else{
                console.log("cant do")
            }
    }
    return validMachines;
}
module.exports = findMachineForPart;
