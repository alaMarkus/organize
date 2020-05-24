const postArray = [
    "%",
    "\r\n",
    "O0001",
    "\r\n",
    "G54",
    "\r\n",
    "G50 S4000",
    "\r\n",
    "G0 X",
    "facingStartingPos",
    "\r\n",
    "G0 Y",
    "facingCutDepth",
    " X0",
    "\r\n",
    "M30"
]

const postParameters = {
    "facingApproachX": 4,
    "facingEndX": 5
}

const part = {

}

const machine = {
    "stockDiameterOutside": 80,
    "stockDiameterInside": 30
}

function insertValues(params,post, part, machine){
    for (let i=0; i<post.length; i++){
        switch(post[i]){
            case "facingStartingPos":
                post[i] = facingStartingPos(machine.stockDiameterOutside, params.facingApproachX)
                break;
            case "facingCutDepth":
                post[i] = facingCutDepth(machine.stockDiameterInside, params.facingEndX)
                break;
        }
    }
    console.log(post)

    function facingStartingPos(stockDiameterOutside,facingApproachX){
        const u = stockDiameterOutside + facingApproachX; //facing APPROACH positioning from stock in x and z
        return u;    
    }
    function facingCutDepth(stockDiameterInside, facingEndX){
        const u = stockDiameterInside - facingEndX;  //facing cut depth in x direction
        return u;       
    }
}

function createGcode(arr){
    let gCodeString = "";
    for (let i = 0; i<arr.length; i++){
        gCodeString = gCodeString.concat(arr[i])
    }
    console.log(gCodeString)
}

insertValues(postParameters,postArray,part,machine)
createGcode(postArray)


