const db = require("mysql2")
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

const insertGet = (sql, args) =>  {
    return new Promise((resolve,reject)=>{
        if (args.includes(undefined)){
            reject(new Error("undefined"))
        }else{
            con.execute(sql, [...args], function(err,result){
                if (err){
                    console.log("ERROR: ")
                    console.log(err.message)
                    reject(new Error(err.message))
                }else{
                    resolve(result)
                }
            })
        }
    })
}

const signInQuery = (sql,sql2,args,args2) => {
    return new Promise((resolve,reject)=>{
        con.execute(sql,[...args], function(err, result){
            if (err){
                console.log("ERROR: ")
                console.log(err.message)
                reject(new Error(err.message))
            }else{
                con.execute(sql2,[...args2], function(err, result){
                    if (err){
                        console.log("ERROR: ")
                        console.log(err.message)
                        reject(new Error(err.message))
                    }else{
                        resolve(result)
                    }
                })
            }
        })
    })
}

exports.signInQuery = signInQuery;
exports.insertGet = insertGet;