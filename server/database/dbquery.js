
const {insertGet,signInQuery} = require('./query')

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
const partToBatch = (user,batchId, partId) => {
    console.log(user)
    const sql = `
        INSERT INTO 
        batchcontent(batchId, partId) 
        VALUES ((SELECT batchId FROM batch 
        JOIN userdata 
        ON batch.userId = userdata.userId 
        WHERE batchId=? AND secId = ?),
        (SELECT partId FROM bushing 
        JOIN project ON bushing.projectId = project.projectId 
        JOIN userdata ON project.userId = userdata.userID 
        WHERE partId=? AND secId=?))`
    const args = [batchId,user,partId,user]
    return insertGet(sql,args)
}


//signinlogin
const signIn = (email, pwhash,newuid) => {
    const sql = "INSERT INTO login (username, password ) VALUES (?,?)"
    const sql2 = "INSERT INTO userdata (username, userType, secId) VALUES (?,?,?)"
    const args = [email,pwhash]
    const args2 = [email,'client',newuid]
    return signInQuery(sql,sql2,args,args2)
}
const logIn = (email) => {
    const sql = "SELECT password FROM login WHERE username = ?"
    const args = [email]
    return insertGet(sql, args)
}


const getUserId  = (username) => {
    const sql = "SELECT secId FROM userdata WHERE username = (?)"
    const args = [username]
    return insertGet(sql, args)
}

exports.getPart = getPart;
exports.getUserId = getUserId;
exports.partToBatch = partToBatch;
exports.insertBatch = insertBatch;
exports.insertProject = insertProject;
exports.logIn = logIn;
exports.signIn = signIn;
exports.insertPart = insertPart;
exports.getBatchContent = getBatchContent;
exports.getBatches = getBatches;
exports.getProjects = getProjects;
exports.getParts = getParts;
