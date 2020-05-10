const db = require("mysql2")
const {insertGet} = require('./query')

//database connection details
const con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "organize"
})

//connect to database
con.connect(function(err){
    if(err) throw err;
    console.log("connected to database")
})

const insertMachine = (user,machineobj) => {
    const sql =`INSERT INTO machine (
                userId,
                machineName,
                post,
                minLength,
                maxLength,
                minOutsideDiameter,
                maxOutsideDiameter,
                minInsideDiameter,
                maxInsideDiameter) 
                VALUES ((SELECT userId FROM userdata WHERE secId=?),?,?,?,?,?,?,?,?)`
    const values = [
        user,
        machineobj.machineName,
        machineobj.post,
        machineobj.minLength,
        machineobj.maxLength,
        machineobj.minOutsideDiameter,
        machineobj.maxOutsideDiameter,
        machineobj.minInsideDiameter,
        machineobj.maxInsideDiameter
    ]
    return insertGet(sql,values)
}

const getMachine = (user, machineId)=>{
    const sql = `SELECT * FROM machine 
                JOIN userdata ON machine.userID = userdata.UserID 
                WHERE secId = ? AND machineId = ?`
    const args= [user,machineId]
    return insertGet(sql,args)
}

const updateMachine = (user, machineobj) => {
    const sql =`UPDATE machine
                JOIN userdata ON machine.userId = userdata.userId
                SET
                machineName=?,
                post=?,
                minLength=?,
                maxLength=?,
                minOutsideDiameter=?,
                maxOutsideDiameter=?,
                minInsideDiameter=?,
                maxInsideDiameter=?
                WHERE machine.machineId = ? AND userdata.secId = ?`
    const args=[
                machineobj.machineName,
                machineobj.post,
                machineobj.minLength,
                machineobj.maxLength,
                machineobj.minOutsideDiameter,
                machineobj.maxOutsideDiameter,
                machineobj.minInsideDiameter,
                machineobj.maxInsideDiameter,
                machineobj.machineId,
                user
            ]
    return insertGet(sql,args)
}

const insertPost = (user, postobj) => {
    const sql =`INSERT INTO postprocessor (
                userId,
                programNumber,
                referencePoint,
                maxRevs,
                toolChangePosition,
                outsideRoughingTool,
                outsideRoughingSpeed,
                facingFeed,
                roughingCycleFirstLine,
                roughingCycleSecondLine,
                outsideFinishingTool,
                outsideFinishingCycle,
                insideRoughingTool,
                insideRoughingCycleFirstLine,
                insideRoughingCycleSecondline,
                insideFinishingTool,
                insideFinishingCycle,
                cutOffTool,
                cutOffSpeed,
                cutOffFeed,
                programEnd,
                postName
                )
                VALUES ((SELECT userId FROM userdata WHERE secId = ?),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    const args = [
        user,
        postobj.programNumber,
        postobj.referencePoint,
        postobj.maxRevs,
        postobj.toolChangePosition,
        postobj.outsideRoughingTool,
        postobj.outsideRoughingSpeed,
        postobj.facingFeed,
        postobj.roughingCycleFirstLine,
        postobj.roughingCycleSecondLine,
        postobj.outsideFinishingTool,
        postobj.outsideFinishingCycle,
        postobj.insideRoughingTool,
        postobj.insideRoughingCycleFirstLine,
        postobj.insideRoughingCycleSecondline,
        postobj.insideFinishingTool,
        postobj.insideFinishingCycle,
        postobj.cutOffTool,
        postobj.cutOffSpeed,
        postobj.cutOffFeed,
        postobj.programEnd,
        postobj.postName
    ]         
    return insertGet(sql,args)   
}

const getPost = (user,postId) => {
    const sql =`SELECT * FROM postprocessor
                JOIN userdata ON postprocessor.userId = userdata.userId
                WHERE userdata.secId = ? AND postprocessor.postId = ?`
    const args = [user,postId]
    return insertGet(sql,args)
}

const updatePost = (user,postobj) => {
    const sql =`UPDATE postprocessor 
                JOIN userdata ON postprocessor.userId = userdata.userId
                SET 
                programNumber = ?,
                referencePoint = ?,
                maxRevs = ?,
                toolChangePosition = ?,
                outsideRoughingTool = ?,
                outsideRoughingSpeed = ?,
                facingFeed = ?,
                roughingCycleFirstLine = ?,
                roughingCycleSecondLine = ?,
                outsideFinishingTool = ?,
                outsideFinishingCycle = ?,
                insideRoughingTool = ?,
                insideRoughingCycleFirstLine = ?,
                insideRoughingCycleSecondline = ?,
                insideFinishingTool = ?,
                insideFinishingCycle = ?,
                cutOffTool = ?,
                cutOffSpeed = ?,
                cutOffFeed = ?,
                programEnd = ?,
                postName = ?
                WHERE userdata.secId = ? AND postId = ?`
    const args = [
        postobj.programNumber,
        postobj.referencePoint,
        postobj.maxRevs,
        postobj.toolChangePosition,
        postobj.outsideRoughingTool,
        postobj.outsideRoughingSpeed,
        postobj.facingFeed,
        postobj.roughingCycleFirstLine,
        postobj.roughingCycleSecondLine,
        postobj.outsideFinishingTool,
        postobj.outsideFinishingCycle,
        postobj.insideRoughingTool,
        postobj.insideRoughingCycleFirstLine,
        postobj.insideRoughingCycleSecondline,
        postobj.insideFinishingTool,
        postobj.insideFinishingCycle,
        postobj.cutOffTool,
        postobj.cutOffSpeed,
        postobj.cutOffFeed,
        postobj.programEnd,
        postobj.postName,
        user,
        postobj.postId
    ]
    return insertGet(sql,args)
}

exports.updatePost = updatePost;
exports.getPost = getPost;
exports.insertPost = insertPost;
exports.updateMachine = updateMachine;
exports.getMachine = getMachine;
exports.insertMachine = insertMachine;