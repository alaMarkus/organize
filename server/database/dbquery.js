const db = require("mysql")

//database connection details
const con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "workshop"
})

//connect to database
con.connect(function(err){
    if(err) throw err;
    console.log("connected to database")
})

const getProjects = (user) =>{
    const sql = "SELECT * FROM projects WHERE userid = ?"
    return new Promise ((resolve, reject) => {
        con.query(sql, [user], function (err, result){
            if (err){
                console.log(err.message)
            }
            resolve(result)
        })
    })

}

const getParts = (project) =>{
    const sql = "SELECT * FROM holkit WHERE projectid = ?"
    return new Promise ((resolve, reject) => {
        con.query(sql, [project], function (err, result){
            if (err){
                console.log(err.message)
            }
            resolve(result)
        })
    })
}

//orders are renamed to batches
const getBatches = (user) => {
    const sql = "SELECT * FROM orders WHERE userid  = ?"
    return new Promise((resolve,reject) => {
        con.query(sql, [user], function (err, result){
            if (err){
                console.log(err.message)
            }
            resolve(result)
        })
    })
}

const getBatchContent = (batch) => {
    const sql = "SELECT partID FROM ordercontent WHERE orderID = ?"
    return new Promise((resolve, reject) => {
        con.query(sql, [batch], function (err, result) {
            if (err){
                console.log(err.message)
            }
            resolve(result);
        })
    })
}

exports.getBatchContent = getBatchContent;
exports.getBatches = getBatches;
exports.getProjects = getProjects;
exports.getParts = getParts;
