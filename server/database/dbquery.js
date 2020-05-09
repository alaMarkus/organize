const db = require("mysql2")

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

//projects
const getProjects = (user) =>{
    const sql = "SELECT * FROM project JOIN userdata ON project.userId=userdata.userId WHERE secId = ?"
    return new Promise ((resolve, reject) => {
        console.log("user inside promise: ")
        console.log(user)
        con.execute(sql, [user], function (err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result)
        })
    })
}
const insertProject = (user, projectName) => {
    const sql = "INSERT INTO project (userId,projectName) VALUES ((SELECT userId FROM userdata WHERE secId=?),?)"
    return new Promise((resolve, reject)=>{
        con.execute(sql, [user,projectName], function(err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }else{
                resolve(result)
            }
        })
    })
}

//parts
const getParts = (project, user) =>{
    const sql = "SELECT * FROM bushing JOIN project ON bushing.projectId = project.projectId JOIN userdata ON project.userId = userdata.userId WHERE bushing.projectId = ? AND userdata.secId='?'"
    return new Promise ((resolve, reject) => {
        con.execute(sql, [project, user], function (err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result)
        })
    })
}
const insertPart = (user,partobj) => {
    const sql = `INSERT INTO bushing 
                (projectId, 
                partName, 
                outsideDiameter, 
                insideDiameter, 
                length, 
                outsideChamfer, 
                insideChamfer, 
                outsideChamferType, 
                insideChamferType) 
                VALUES (
                (SELECT projectId FROM project 
                JOIN userdata ON project.userId = userdata.userId 
                WHERE projectId=? AND secId=?),
                ?,?,?,?,?,?,?,?)`
    
    const values = [
        partobj.projectId, 
        partobj.partName, 
        partobj.outsideDiameter, 
        partobj.insideDiameter,
        partobj.partLength,
        partobj.outsideChamfer,
        partobj.insideChamfer,
        partobj.outsideChamferType,
        partobj.insideChamferType
    ]
    return new Promise((resolve, reject) => {
        if (values.includes(undefined)){
            reject(new Error("undefined"))
        }else{
            con.execute(sql,[
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
            ], 
            function (err, result){
                if (err){
                    reject(new Error(err.message))
                }else{
                    resolve(result)
                }
            })
        }
    })
}

//orders are renamed to batches
const getBatches = (user) => {
    const sql = "SELECT * FROM batch JOIN userdata ON batch.userId=userdata.userId WHERE secId = ?"
    return new Promise((resolve,reject) => {
        con.execute(sql, [user], function (err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result)
        })
    })
}
const getBatchContent = (user,batch) => {
    const sql = "SELECT partId FROM batchcontent JOIN batch ON batchcontent.batchId=batch.batchId JOIN userdata ON batch.userID = userdata.userId WHERE secId = ? batchId = ?"
    return new Promise((resolve, reject) => {
        con.execute(sql, [user, batch], function (err, result) {
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result);
        })
    })
}
const insertBatch = (user, batchName) => {
    const sql = "INSERT INTO batch (batchName, userId) VALUES (?,(SELECT userID FROM userdata WHERE secId=?))"
    const values = [
        batchName,
        user
    ]
    return new Promise((resolve,reject)=>{
        con.execute(sql, [batchName,user], function(err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }else{
                resolve(result)
            }
        })
    })
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

    const values = [
        batchId,
        partId
    ]
    return new Promise((resolve, reject)=>{
        con.execute(sql, [batchId,user,partId,user], function(err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }else{
                resolve(result)
            }
        })
    })
}


//signinlogin
const signIn = (email, pwhash,newuid) => {
    const sql = "INSERT INTO login (username, password ) VALUES (?,?)"
    const sql2 = "INSERT INTO userdata (username, userType, secId) VALUES (?,?,?)"
    return new Promise((resolve, reject) => {
        con.execute(sql, [email, pwhash], function (err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            con.execute(sql2, [email, "client",newuid], function(err, result2){
                if (err){
                    reject(new Error(err.message))
                }
                resolve(result2)
            })
        })
    })
}
const logIn = (email) => {
    const sql = "SELECT password FROM login WHERE username = ?"
    return new Promise((resolve, reject) => {
        con.execute(sql, [email], function(err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result)
        })
    })
}


const getUserId  = (username) => {
    const sql = "SELECT secId FROM userdata WHERE username = (?)"
    return new Promise((resolve,reject)=>{
        con.execute(sql,[username], function(err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result)
        })
    })
}

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
