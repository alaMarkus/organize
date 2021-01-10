const fs = require('fs')

exports.writeNcFile = (machineobj,postobj,partobj) =>{
    console.log("called writenc")
    console.log(postobj)

    fs.mkdir('./data/'+machineobj.machineName+"_"+machineobj.machineId,function(err){
        if (err){
            console.log("cannot create folder: ")
            console.log(err)
        }
    })
    const lb = "\r\n"
    const stockDiameterInside = partobj.insideDiameter - 5;
    const stockDiameterOutside = partobj.outsideDiameter +5;

    const gCode = 
        postobj.programNumber+lb+
        "(stock outside d:"+stockDiameterOutside+")"+lb+
        "(stock inside d: "+stockDiameterInside+")"+lb+
        "(part length: "+partobj.bushingLength+")"+lb+
        postobj.referencePoint+lb+
        postobj.maxRevs+lb+
        postobj.toolChangePosition+lb+
        postobj.outsideRoughingTool+lb+
        postobj.outsideRoughingSpeed+lb+
        postobj.facingFeed+lb+
        facingStartingPos(stockDiameterOutside)+lb+
        facingCutDepth(stockDiameterInside)+lb+
        facingEndPos(stockDiameterOutside)+lb+
        postobj.roughingCycleFirstLine+lb+
        postobj.roughingCycleSecondLine+lb+
        geometryStart(partobj.outsideDiameter,partobj.outsideChamfer)+lb+
        chamferEnd(partobj.outsideDiameter,partobj.outsideChamfer)+lb+
        cuttingLength(partobj.bushingLength,partobj.outsideChamfer)+lb+
        rearChamfer(partobj.outsideDiameter,partobj.outsideChamfer,partobj.bushingLength)+lb+
        rearChamferClear(partobj.bushingLength)+lb+
        geometryEnd(stockDiameterOutside)+lb+
        postobj.toolChangePosition+lb+
        postobj.outsideFinishingTool+lb+
        finishingPositioning(stockDiameterOutside)+lb+
        postobj.outsideFinishingCycle+lb+
        postobj.toolChangePosition+lb+
        postobj.insideRoughingTool+lb+
        insideStartingPos(stockDiameterInside)+lb+
        postobj.insideRoughingCycleFirstLine+lb+
        postobj.insideRoughingCycleSecondline+lb+
        insideGeometryStart(partobj.insideDiameter,partobj.insideChamfer)+lb+
        insideChamferEnd(partobj.insideDiameter,partobj.insideChamfer)+lb+
        insideCuttingLength(partobj.bushingLength,partobj.insideChamfer)+lb+
        insideRearChamfer(partobj.insideDiameter,partobj.insideChamfer,partobj.bushingLength)+lb+
        insideRearChamferClear(partobj.bushingLength)+lb+
        insideGeometryEnd(partobj.insideDiameter)+lb+
        postobj.toolChangePosition+lb+
        postobj.insideFinishingTool+lb+
        insideFinishingPositioning(stockDiameterInside)+lb+
        postobj.insideFinishingCycle+lb+
        postobj.toolChangePosition+lb+
        postobj.cutOffTool+lb+
        postobj.cutOffSpeed+lb+
        postobj.cutOffFeed+lb+
        cutoffStartingPos(stockDiameterOutside,partobj.bushingLength)+lb+
        cutoffDepth(stockDiameterInside)+lb+
        cutoffEndPos(stockDiameterOutside)+lb+
        postobj.toolChangePosition+lb+
        postobj.programEnd+lb;
        
    
    fs.writeFile('./data/'+machineobj.machineName+"_"+machineobj.machineId+"/"+partobj.partName+"_"+partobj.partId+".nc",gCode, function(err){
        if (err){
            console.log("cant write file: ")
            console.log(err)
        }else{
            console.log("created file "+partobj.partName+"_"+partobj.partId+".nc"+" to ./data/"+machineobj.machineName+"_"+machineobj.machineId)
        }
    })
}

function facingStartingPos(stockDiameterOutside){
    const u = stockDiameterOutside + 2; //facing APPROACH positioning from stock in x and z
	return "G0 X"+u+" Z0";      // facing approach G-code
}
function facingCutDepth(stockDiameterInside){
    const u = stockDiameterInside - 2;  //facing cut depth in x direction
	return "G1 X"+u;            //facing gut G-code
}
function facingEndPos(stockDiameterOutside){
    const u = stockDiameterOutside;     // facing RETRACT positioning after in x and z
    const w = 2;                
	return "G0 X"+u+" Z"+w;     //facing RETRACT G-code
}
function geometryStart(diameterOutside,outsideChamfer){
    const u = diameterOutside - (outsideChamfer*2);  //geometry start APPROACH positioning
    const w = 0;
	return "N10 G0 X"+u+"\r\n"+"G1 Z"+w; //geometry start APPROACH G-code
}
function chamferEnd(diameterOutside,outsideChamfer){
    const u = diameterOutside;
    const w = -outsideChamfer;
	return "X"+u+" Z"+w;
}
function cuttingLength(partLength,outsideChamfer){
    const w = -partLength + outsideChamfer;
	return "Z"+w;
}
function rearChamfer(diameterOutside,outsideChamfer,partLength){
    const u = diameterOutside - (outsideChamfer*2);
    const w = -partLength;
	return "X"+u+" Z"+w;
}
function rearChamferClear(partLength){
    const w = -partLength - 3.5;
	return "Z"+w;	
}
function geometryEnd(stockDiameterOutside){
    const u = stockDiameterOutside + 2;
	return "N20 X"+u;
}
function finishingPositioning(stockDiameterOutside){
    const u = stockDiameterOutside;
    const w = 2;
	return "G0 X"+u+" Z"+w;
}
function insideStartingPos(stockDiameterInside){
    const u = stockDiameterInside;
    const w = 2;
	return "G0 X"+u+" Z"+w;
}
function insideGeometryStart(diameterInside,insideChamfer){
    const u = diameterInside + (insideChamfer*2);
    const w = 0;
	return "N30 G0 X"+u+"\r\n"+"G1 Z"+w;
}
function insideChamferEnd(diameterInside,insideChamfer){
    const u = diameterInside;
    const w = -insideChamfer;
	return "X"+u+" Z"+w;
}
function insideCuttingLength(partLength,insideChamfer){
    const w = -partLength + insideChamfer;
	return "Z"+w;
}
function insideRearChamfer(diameterInside,insideChamfer,partLength){
    const u = diameterInside + (insideChamfer*2);
    const w = -partLength;
	return "X"+u+" Z"+w;
}
function insideRearChamferClear(partLength){
    const w = -partLength - 3.5; //room for cutting tool
	return "Z"+w;
}
function insideGeometryEnd(diameterInside){
    const u = diameterInside - 1;
	return "N40 X"+u;
}
function insideFinishingPositioning(stockDiameterInside){
    const u = stockDiameterInside;
    const w = 2;
	return "GO X"+u+" Z"+w;
}
function cutoffStartingPos(stockDiameterOutside,partLength){
    const u = stockDiameterOutside + 2;
    const w = -partLength - 3; //cutting tool width
	return "G0 X"+u+" Z"+w;
}
function cutoffDepth(stockDiameterInside){
    const u = stockDiameterInside - 2;
	return "G1 X"+u;
}
function cutoffEndPos(stockDiameterOutside){
    const u = stockDiameterOutside + 2;
	return "G0 X"+u;
}