const db = require("mysql2")

const con = db.createConnection(mode())

function mode(){
    if(process.env.NODE_ENV==='test'){
        return ({
            host: "localhost",
            user: "root",
            password: "",
            database: "organizetest",
            multipleStatements: true
        })
    }else{
        return ({
            host: "95.216.173.144",
            user: "root",
            password: "",
            database: "organize"
        })
    }
}



con.connect(function(err){
    if(err) throw err;
    console.log("connected to database")
})

const closeConnetion = () =>{
    con.end()
}

const insertGet = (sql, args) =>  {
    return new Promise((resolve,reject)=>{
        if (args===undefined){
            con.execute(sql, function(err, result){
                if (err){
                    console.log("ERROR: ")
                    console.log(err.message)
                    reject(new Error(err.message))
                }else{
                    resolve(result)
                }
            })
        }else{
            if (args.includes(undefined)){
                reject(new Error("undefined value in args"))
            }
            if (args.includes("")){
                reject(new Error("empty value in args"))
            }
            else{
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

exports.closeConnetion = closeConnetion;
exports.signInQuery = signInQuery;
exports.insertGet = insertGet;