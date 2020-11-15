const {insertGet} = require('./dbConnetion')

exports.insertMachine = (user,machineobj) => {
    const sql =
        `INSERT INTO machine (
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

exports.getMachine = (user, machineId)=>{
    const sql = 
        `SELECT 
        machineId,
        machineName,
        post,
        minLength,
        maxLength,
        minOutsideDiameter,
        maxOutsideDiameter,
        minInsideDiameter,
        maxInsideDiameter,
        stockOutsideDiameter,
        stockInsideDiameter,
        rapidSpeed,
        maxRpm
        FROM machine 
        JOIN userdata ON machine.userID = userdata.UserID 
        WHERE secId = ? AND machineId = ?`
    const args= [user,machineId]
    return insertGet(sql,args)
}

exports.updateMachine = (user, machineobj) => {
    const sql =
        `UPDATE machine
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

exports.insertPost = (user, postobj) => {
    const sql =
        `INSERT INTO postprocessor (
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

exports.getPost = (user,postId) => {
    const sql =
        `SELECT
        postId,
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
        FROM postprocessor
        JOIN userdata ON postprocessor.userId = userdata.userId
        WHERE userdata.secId = ? AND postprocessor.postId = ?`
    const args = [user,postId]
    return insertGet(sql,args)
}

exports.updatePost = (user,postobj) => {
    const sql =
        `UPDATE postprocessor 
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

exports.getAllMachines = () =>{
    const sql = "SELECT * FROM machine"
    return insertGet(sql)
}

exports.deleteMachine = (user, machineId) =>{
    const sql = "DELETE machine FROM machine JOIN userdata ON machine.userId = userdata.userId WHERE machineId = ? AND secId = ?"
    const args = [machineId, user]
    return insertGet(sql,args)
}
exports.deletePost = (user,postId) => {
    const sql = 
        `DELETE postprocessor FROM postprocessor
        JOIN userdata ON postprocessor.userId = userdata.userId
        WHERE postId = ? AND secId = ?`
    const args = [postId, user]
    return insertGet(sql, args)
}

exports.getParameters = (id) =>{
    const sql = `SELECT * FROM postparameter WHERE parameterSetId = ?`
    const args = [id]
    return insertGet(sql,args)
}
