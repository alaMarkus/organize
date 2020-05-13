
const {insertGet} = require('./dbConnetion')

//projects
const getProjects = (user) =>{
    const sql = "SELECT projectId, projectName FROM project JOIN userdata ON project.userId=userdata.userId WHERE secId = ?"
    const args = [user]
    return insertGet(sql,args)
}
const insertProject = (user, projectName) => {
    const sql = "INSERT INTO project (userId,projectName) VALUES ((SELECT userId FROM userdata WHERE secId=?),?)"
    const args = [user,projectName]
    return insertGet(sql,args)
}
const deleteProject = (projectId, user) => {
    const sql = "DELETE project FROM project JOIN userdata ON project.userId = userdata.userId WHERE projectId = ? AND secId = ?"
    const args = [projectId,user]
    return insertGet(sql,args)
}
const deleteProjectWithName = (projectName, user) => {
    const sql  = "DELETE project FROM project JOIN userdata ON project.userId=userdata.userId WHERE projectName = ? AND secId = ?"
    const args = [projectName,user]
    return insertGet(sql,args)
}

//parts
const getParts = (project, user) =>{
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

const getPart = (partId, user) => {
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
const insertPart = (user,partobj) => {
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
const deletePart = (user,partId) => {
    const sql = 
        `DELETE bushing FROM bushing
        JOIN project ON bushing.projectId = project.projectId 
        JOIN userdata ON project.userId = userdata.userId 
        WHERE bushing.projectId = ? AND userdata.secId=?`
    const args = [partId,user]
    return insertGet(sql,args)
}

//orders are renamed to batches
const getBatches = (user) => {
    const sql = "SELECT batchId, batchName FROM batch JOIN userdata ON batch.userId=userdata.userId WHERE secId = ?"
    const args = [user]
    return insertGet(sql,args)
}
const getBatchContent = (user,batch) => {
    const sql =
            `SELECT partId FROM batchcontent 
            JOIN batch ON batchcontent.batchId=batch.batchId
            JOIN userdata ON batch.userId = userdata.userId 
            WHERE batchcontent.batchId = ? AND userdata.secId = ?`
    const args = [batch, user]
    return insertGet(sql,args)
}
const insertBatch = (user, batchName) => {
    const sql = "INSERT INTO batch (batchName, userId) VALUES (?,(SELECT userID FROM userdata WHERE secId=?))"
    const args = [batchName,user]
    return insertGet(sql,args)
}
const deleteBatch = (batchId, user) => {
    const sql = `DELETE batch FROM batch JOIN userdata ON batch.userId = userdata.userId WHERE batchId = ? AND secId = ?`
    const args = [batchId, user]
    return insertGet(sql,args)
}

const partToBatch = (user,batchId, partId) => {
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
const removePartFromBatch = (user,partId,batchId) => {
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


exports.deleteProjectWithName = deleteProjectWithName;
exports.removePartFromBatch = removePartFromBatch;
exports.deleteBatch = deleteBatch;
exports.deletePart = deletePart;
exports.deleteProject = deleteProject;
exports.getPart = getPart;
exports.partToBatch = partToBatch;
exports.insertBatch = insertBatch;
exports.insertProject = insertProject;
exports.insertPart = insertPart;
exports.getBatchContent = getBatchContent;
exports.getBatches = getBatches;
exports.getProjects = getProjects;
exports.getParts = getParts;
