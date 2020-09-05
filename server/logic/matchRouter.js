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
    partQueries.getBatchContent(user,batchId)
        .then(e=>{
        //    queries.getAllMachines()
            //    .then(allMachines=>{
                    for(let i = 0; i<e.length; i++){
                        console.log(e[i].partId)
                        partQueries.getPart(e[i].partId, user)
                            .then(result=>{
                                partArr.push(result[0])
                              //  const chosenmachine = findMachineForPart(result[0], allMachines)
                                /*if (chosenmachine===undefined){
                                    partArr[i].machineId = "no valid machines"
                                }else{
                                    partArr[i].machineId = chosenmachine.machineId
                                }*/
                                if(i===e.length-1){
                                    console.log(partArr)
                                    res.send(partArr)
                                }
                            })
                            .catch(function(e){
                                res.send("something went wrong")
                                console.log("something went wrong")
                                console.log(e)
                            })
                    }
            //    })
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log("something went wrong")
            console.log(e)
        })
})

module.exports = matchRouter