const matchRouter = require('express').Router()
const isAuth = require('../controllers/isAuth')
const match = require('./matchMachines')
const queries = require("../database/manudb")
const partQueries = require("../database/dbquery")

matchRouter.post("/match",isAuth, function(req,res){
    const user = req.session.userid
    const part = req.body.partId
    console.log(part)
    partQueries.getPart(part,user)
        .then(partobj=>{
            queries.getAllMachines()
                .then(machinesobj=>{
                    match(partobj,machinesobj)
                    res.send("it works")
                })
                .catch(function(e){
                    res.send("something went wrong")
                    console.log("something went wrong")
                    console.log(e)
                })
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log("something went wrong")
            console.log(e)
        })
})

module.exports = matchRouter