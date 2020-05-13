const testRouter = require('express').Router()
const {insertGet} = require('../database/dbConnetion')
const isAuth = require('../controllers/isAuth')

testRouter.post("/disableforeignkey", function(req,res){
    const sql = "SET FOREIGN_KEY_CHECKS=0;"
    insertGet(sql)
        .then(res.send("disabled foreign keys"))
        .catch(function(e){
            console.log("something went wrong")
            console.log(e)
            res.send("something went wrong")
        })
})

testRouter.post("/enableforeignkey", function(req,res){
    const sql = "SET FOREIGN_KEY_CHECKS=1;"
    insertGet(sql)
        .then(res.send("enabled foreign keys"))
        .catch(function(e){
            console.log("something went wrong")
            console.log(e)
            res.send("something went wrong")
        })
})

testRouter.post("/resettestdatabase",function(req,res){
    const sql2 = "TRUNCATE batch" 
    const sql3 = "TRUNCATE batchcontent" 
    const sql4 = "TRUNCATE bushing" 
    const sql5 = "TRUNCATE login"
    const sql6 = "TRUNCATE machine"
    const sql7 = "TRUNCATE partorder" 
    const sql8 = "TRUNCATE postprocessor" 
    const sql9 = "TRUNCATE project" 
    const sql10= "TRUNCATE userdata"
    insertGet(sql2)
    insertGet(sql3)
    insertGet(sql4)
    insertGet(sql5)
    insertGet(sql6)
    insertGet(sql7)
    insertGet(sql8)
    insertGet(sql9)
    insertGet(sql10)
        .then(function(result){
            console.log(result)
            res.send("database cleared")
        })
        .catch(function(e){
            console.log("something went wrong")
            console.log(e)
            res.send("something went wrong")
        })
                    
})

module.exports = testRouter;