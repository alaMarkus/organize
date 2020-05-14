const {insertGet} = require('./dbConnetion')

exports.createOrder = (user,batchId) => {
    const sql = 
        `INSERT INTO partorder (batchId)
        VALUES ((SELECT batchId FROM batch 
        JOIN userdata ON batch.userId = userdata.userId
        WHERE batchId = ? AND secId = ?))`
    const args = [batchId, user]
    return insertGet(sql,args)
}

exports.getOrderContent = (batchId) => {
    const sql = 
        `SELECT partId FROM batchcontent 
        WHERE batchId = (SELECT batchId FROM partorder WHERE batchId = ?)`
    const args = [batchId]
    return insertGet(sql, args)
}

exports.getPartForOrder = (partId) => {
    const sql = `SELECT 
                bushing.partId,
                partName,
                outsideDiameter, 
                insideDiameter, 
                bushingLength, 
                outsideChamfer, 
                insideChamfer, 
                outsideChamferType, 
                insideChamferType
                FROM bushing
                JOIN batchcontent ON bushing.partId = batchcontent.partId
                WHERE bushing.partId = ? AND batchcontent.batchId = (SELECT batch.batchId FROM batch                 
                JOIN batchcontent ON batch.batchId = batchcontent.batchId
                JOIN partorder ON batchcontent.batchId = partorder.batchId
                WHERE partId = ?)`
    const args = [partId,partId]
    return insertGet(sql,args)
}