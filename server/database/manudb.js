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

const insertMachine = (user,machineobj) => {
    const sql = "INSERT INTO machine (userId,machineName,post,minLength,maxLength,minOutsideDiameter,maxOutsideDiameter,minInsideDiameter,maxInsideDiameter) VALUES ((SELECT userId FROM userdata WHERE secId=?),?,?,?,?,?,?,?,?)"
    const values = [
        machineobj.machineName,
        machineobj.post,
        machineobj.minLength,
        machineobj.maxLength,
        machineobj.minOutsideDiameter,
        machineobj.maxOutsideDiameter,
        machineobj.minInsideDiameter,
        machineobj.maxInsideDiameter
    ]
    return new Promise((resolve, reject)=>{
        if (values.includes(undefined)){
            console.log(values)
            reject(new Error("undefined"))
        }else{
            con.execute(sql, [
                user,
                machineobj.machineName,
                machineobj.post,
                machineobj.minLength,
                machineobj.maxLength,
                machineobj.minOutsideDiameter,
                machineobj.maxOutsideDiameter,
                machineobj.minInsideDiameter,
                machineobj.maxInsideDiameter
            ], 
            function(err, result){
                if (err){
                    reject(new Error(err.message))
                }else{
                    resolve(result)
                }
            })
        }
    })
}

const getMachine = (user, machineId)=>{
    const sql = `SELECT * FROM machine 
                JOIN userdata ON machine.userID = userdata.UserID 
                WHERE secId = ? AND machineId = ?`

    return new Promise((resolve,reject)=>{
        con.execute(sql,[user,machineId], function(err,result){
            if (err){
                reject(new Error(err.message))
            }else{
                resolve(result)
            }
        })
    })
}

const updateMachine = (user, machineobj) => {
    
}

exports.getMachine = getMachine;
exports.insertMachine = insertMachine;