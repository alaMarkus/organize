exports.partObj = {
    "partId": 1,
    "partName": "part1",
    "outsideDiameter": 46,
    "insideDiameter": 26,
    "bushingLength": 40,
    "insideChamfer": 2,
    "outsideChamfer": 2,
    "insideChamferType": "chamfer",
    "outsideChamferType": "chamfer"
}

exports.haas = {
    "machineId": 1,
    "machineName": "haas",
    "minInsideDiameter": 20,
    "maxInsideDiameter":30,
    "minOutsideDiameter": 35,
    "maxOutsideDiameter": 50,
    "minLength": 30,
    "maxLength": 50,
    "stockInsideDiameter": 19.5,
    "stockOutsideDiameter": 51
}

exports.puma = {
    "machineId": 2,
    "machineName": "puma",
    "minInsideDiameter": 25,
    "maxInsideDiameter":40,
    "minOutsideDiameter": 45,
    "maxOutsideDiameter": 60,
    "minLength": 30,
    "maxLength": 50,
    "stockInsideDiameter": 24,
    "stockOutsideDiameter": 61
}

exports.machineArr = [this.puma, this.haas]

