const db = require("mysql")

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

const getProjects = (user) =>{
    const sql = "SELECT * FROM project WHERE userId = ?"
    return new Promise ((resolve, reject) => {
        con.query(sql, [user], function (err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result)
        })
    })
}

const getParts = (project) =>{
    const sql = "SELECT * FROM bushing WHERE projectId = ?"
    return new Promise ((resolve, reject) => {
        con.query(sql, [project], function (err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result)
        })
    })
}

//orders are renamed to batches
const getBatches = (user) => {
    const sql = "SELECT * FROM batch WHERE userId  = ?"
    return new Promise((resolve,reject) => {
        con.query(sql, [user], function (err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result)
        })
    })
}

const getBatchContent = (batch) => {
    const sql = "SELECT partId FROM batchcontent WHERE batchId = ?"
    return new Promise((resolve, reject) => {
        con.query(sql, [batch], function (err, result) {
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result);
        })
    })
}

const insertPart = (partobj) => {
    const sql = "INSERT INTO bushing (projectId, partName, outsideDiameter, insideDiameter, length, outsideChamfer, insideChamfer, outsideChamferType, insideChamferType) values (?)"
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
            con.query(sql,[values], function (err, result){
                if (err){
                    reject(new Error(err.message))
                }else{
                    resolve(result)
                }
            })
        }
    })
}

const insertProject = (user, projectName) => {
    const sql = "INSERT INTO project (userId,projectName) VALUES (?)"
    const values = [
        user,
        projectName
    ]
    return new Promise((resolve, reject)=>{
        con.query(sql, [values], function(err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }else{
                resolve(result)
            }
        })
    })
}

const insertBatch = (user, batchName) => {
    const sql = "INSERT INTO batch (batchName, userId) VALUES (?)"
    const values = [
        batchName,
        user
    ]
    return new Promise((resolve,reject)=>{
        con.query(sql, [values], function(err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }else{
                resolve(result)
            }
        })
    })
}

const partToBatch = (batchId, partId) => {
    const sql = "INSERT INTO batchcontent (batchId, partId) VALUES (?)"
    const values = [
        batchId,
        partId
    ]
    return new Promise((resolve, reject)=>{
        con.query(sql, [values], function(err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }else{
                resolve(result)
            }
        })
    })
}

const signIn = (email, pwhash) => {
    const sql = "INSERT INTO login (username, password ) VALUES (?,?)"
    return new Promise((resolve, reject) => {
        con.query(sql, [email, pwhash], function (err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result)
        })
    })
}

const logIn = (email) => {
    const sql = "SELECT Password FROM login WHERE username = ?"
    return new Promise((resolve, reject) => {
        con.query(sql, [email], function(err, result){
            if (err){
                console.log(err.message)
                reject(new Error(err.message))
            }
            resolve(result)
        })
    })
}

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
