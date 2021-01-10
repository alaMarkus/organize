const fs = require('fs')
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

testRouter.post("/showncfiles", function(req,res){
    const dataPath = "../server/data/"
    let ncFileObj = {}
    fs.readdir(dataPath,function(err,folders){
        if (err){
            console.log("error",err)
            res.send("error")
        }
        console.log(folders)
        for (let i = 0; i<folders.length; i++){
            fs.readdir(dataPath+folders[i],function(err,files){
                for (let i2 = 0; i2<files.length;i2++){
                    const filestring = fs.readFileSync(dataPath+folders[i]+"/"+files[i2],{encoding:"utf-8"})
                    ncFileObj[files[i2].split(' ').join('_').split('.').join('_')] = filestring
                    if (i===folders.length-1&&i2===files.length-1){
                        console.log(ncFileObj)
                        res.send(ncFileObj)
                    }
                }
            })
        }
    })
})

module.exports = testRouter;