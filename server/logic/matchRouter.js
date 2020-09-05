const matchRouter = require('express').Router()
const isAuth = require('../controllers/isAuth')
const queries = require("../database/machineQuery")
const parts = require("../database/orderQuery")
const partQueries = require("../database/partsQuery")
const {findMachineForPart} = require("./matchMachines")

matchRouter.post("/partdatafororderbatch",isAuth, function(req,res){
    const user = req.session.userid
    const batchId = req.body.batchId
    let partArr = []
        queries.getAllMachines()
            .then(allMachines=>{
                partQueries.getPartsOfBatch(batchId, user)
                    .then(result=>{
                        for (let i = 0; i<result.length; i++){
                           const chosenMachine = findMachineForPart(result[i], allMachines)
                           partArr.push()
                        }
                        console.log(result)
                        res.send(result)
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