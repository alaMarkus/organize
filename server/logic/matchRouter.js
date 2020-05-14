const matchRouter = require('express').Router()
const isAuth = require('../controllers/isAuth')
const match = require('./matchMachines')
const queries = require("../database/machineQuery")
const parts = require("../database/orderQuery")
const {writeNcFile} = require("./writeNcFile")

matchRouter.post("/match",isAuth, function(req,res){
    const user = req.session.userid
    const partId = req.body.partId
    console.log(partId)
    console.log(user)
    parts.getPartForOrder(partId)
        .then(partArr=>{
            queries.getAllMachines()
                .then(machinesobj=>{
                    const validMachines = match(partArr,machinesobj) //returns array
                    console.log("valid machines: ")
                    console.log(validMachines)
                    res.send("valid machines for part "+partId+": "+validMachines)
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

matchRouter.post("/writenc", isAuth,function(req,res){
    const user = req.session.userid
    const mahchineId = req.body.machineId
    const postId = req.body.postId
    const partId = req.body.partId

    Promise.all([
        queries.getMachine(user,mahchineId),
        queries.getPost(user,postId),
        parts.getPartForOrder(partId)
    ])
    .then(function(results){
        writeNcFile(results[0][0],results[1][0],results[2][0])
        res.send("called it")
    })
    .catch(function(e){
        res.send("something went wrong")
        console.log("something went wrong")
        console.log(e)
    })
})

module.exports = matchRouter