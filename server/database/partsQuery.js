const {insertGet} = require('./dbConnetion')

//projects
exports.getProjects = (user) =>{
    const sql = "SELECT projectId, projectName FROM project JOIN userdata ON project.userId=userdata.userId WHERE secId = ?"
    const args = [user]
    return insertGet(sql,args)
}
exports.insertProject = (user, projectName) => {
    const sql = "INSERT INTO project (userId,projectName) VALUES ((SELECT userId FROM userdata WHERE secId=?),?)"
    const args = [user,projectName]
    return insertGet(sql,args)
}
exports.deleteProject = (projectId, user) => {
    const sql = "DELETE project FROM project JOIN userdata ON project.userId = userdata.userId WHERE projectId = ? AND secId = ?"
    const args = [projectId,user]
    return insertGet(sql,args)
}

exports.deleteProjectWithName = (projectName, user) => {
    const sql  = "DELETE project FROM project JOIN userdata ON project.userId=userdata.userId WHERE projectName = ? AND secId = ?"
    const args = [projectName,user]
    return insertGet(sql,args)
}

//parts
exports.getParts = (project, user) =>{
    const sql =
        `SELECT 
        partId,
        partName, 
        outsideDiameter, 
        insideDiameter, 
        bushingLength, 
        outsideChamfer, 
        insideChamfer, 
        outsideChamferType, 
        insideChamferType
        FROM bushing 
        JOIN project ON bushing.projectId = project.projectId 
        JOIN userdata ON project.userId = userdata.userId 
        WHERE bushing.projectId = ? AND userdata.secId=?`
    const args = [project, user]
    return insertGet(sql,args)
}

exports.getPartsOfBatch = (batch, user) =>{
    const sql =
        `SELECT 
        partId,
        partName, 
        outsideDiameter, 
        insideDiameter, 
        bushingLength, 
        outsideChamfer, 
        insideChamfer, 
        outsideChamferType, 
        insideChamferType
        FROM bushing 
        JOIN batchcontent ON batchcontent.partId = bushing.partId
        JOIN batch ON batch.batchId = batchcontent.batchId
        JOIN userdata ON batch.userId = userdata.userId 
        WHERE batchcontent.batchId = ? AND userdata.secId=?`
    const args = [batch, user]
    return insertGet(sql,args)
}


exports.getPart = (partId, user) => {
    const sql =
        `SELECT 
        partId,
        partName, 
        outsideDiameter, 
        insideDiameter, 
        bushingLength, 
        outsideChamfer, 
        insideChamfer, 
        outsideChamferType, 
        insideChamferType
        FROM bushing JOIN project
        ON bushing.projectId = project.projectId
        JOIN userdata
        ON project.userId = userdata.userId
        WHERE partId = ? AND secId = ?`
    const args = [partId, user]
    return insertGet(sql,args)  
}
exports.insertPart = (user,partobj) => {
    const sql = 
        `INSERT INTO bushing 
        (projectId, 
        partName, 
        outsideDiameter, 
        insideDiameter, 
        bushingLength, 
        outsideChamfer, 
        insideChamfer, 
        outsideChamferType, 
        insideChamferType) 
        VALUES (
        (SELECT projectId FROM project 
        JOIN userdata ON project.userId = userdata.userId 
        WHERE projectId=? AND secId=?),
        ?,?,?,?,?,?,?,?)`
    
    const args = [
        partobj.projectId,
        user, 
        partobj.partName, 
        partobj.outsideDiameter, 
        partobj.insideDiameter,
        partobj.partLength,
        partobj.outsideChamfer,
        partobj.insideChamfer,
        partobj.outsideChamferType,
        partobj.insideChamferType
    ]
    return insertGet(sql,args)
}
exports.deletePart = (user,partId) => {
    const sql = 
        `DELETE bushing FROM bushing
        JOIN project ON bushing.projectId = project.projectId 
        JOIN userdata ON project.userId = userdata.userId 
        WHERE bushing.partId = ? AND userdata.secId=?`
    const args = [partId,user]
    return insertGet(sql,args)
}

//orders are renamed to batches
exports.getBatches = (user) => {
    const sql = "SELECT batchId, batchName FROM batch JOIN userdata ON batch.userId=userdata.userId WHERE secId = ?"
    const args = [user]
    return insertGet(sql,args)
}
exports.getBatchContent = (user,batch) => {
    const sql =
        `SELECT bushing.partId, partName FROM bushing
        JOIN batchcontent ON bushing.partId = batchcontent.partId 
        JOIN batch ON batchcontent.batchId=batch.batchId
        JOIN userdata ON batch.userId = userdata.userId 
        WHERE batchcontent.batchId = ? AND userdata.secId = ?`
    const args = [batch, user]
    return insertGet(sql,args)
}
exports.insertBatch = (user, batchName) => {
    const sql = "INSERT INTO batch (batchName, userId) VALUES (?,(SELECT userID FROM userdata WHERE secId=?))"
    const args = [batchName,user]
    return insertGet(sql,args)
}
exports.deleteBatch = (batchId, user) => {
    const sql = `DELETE batch FROM batch JOIN userdata ON batch.userId = userdata.userId WHERE batchId = ? AND secId = ?`
    const args = [batchId, user]
    return insertGet(sql,args)
}

exports.partToBatch = (user,batchId, partId) => {
    console.log(user)
    console.log(batchId)
    console.log(partId)
    const sql = `
        INSERT INTO 
        batchcontent(batchId, partId)
        VALUES ((SELECT batchId FROM batch 
        JOIN userdata 
        ON batch.userId = userdata.userId 
        WHERE batchId=? AND secId = ?),
        (SELECT partId FROM bushing 
        JOIN project ON bushing.projectId = project.projectId 
        JOIN userdata ON project.userId = userdata.userId
        WHERE partId=? AND secId=?))`
    const args = [batchId,user,partId,user]
    return insertGet(sql,args)
}

exports.projectToBatch = (batchId, projectId, user) =>{
    const sql = `INSERT INTO batchcontent (batchId, partId )
                    SELECT batchId, partId
                    FROM bushing JOIN batch JOIN userdata ON batch.userId = userdata.userId WHERE projectId = ? AND batchId = ? AND userdata.secId = ?`
    const args = [projectId,batchId, user]
    return insertGet(sql, args)
}

exports.removePartFromBatch = (user,partId,batchId) => {
    console.log(user)
    console.log(batchId)
    console.log(partId)
    const sql = 
        `DELETE batchcontent FROM batchcontent 
        JOIN batch ON batchcontent.batchId = batch.batchId 
        JOIN userdata ON batch.userId = userdata.userId
        WHERE batchcontent.partId = ? AND batchcontent.batchId = ? AND secId = ?`
    const args = [partId,batchId,user]
    return insertGet(sql,args)
}

