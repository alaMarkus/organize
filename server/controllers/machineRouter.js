const machineRouter = require('express').Router();
const queries = require("../database/manudb");
const isAuth = require("./isAuth")

machineRouter.post("/insertmachine", isAuth, function(req,res){
    const user = req.session.userid
    const machineobj = req.body.machineobj
    queries.insertMachine(user,machineobj)
        .then(function(result){
            res.send("inserted machine succesfully")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log("something went wrong")
            console.log(e)
        })
})

machineRouter.post("/getmachine", isAuth, function(req,res){
    const user = req.session.userid
    const machineId = req.body.machineId
    queries.getMachine(user,machineId)
        .then(result=>{
            res.send(result)
        })
        .catch(function(e){
            console.log("something went wrong")
            console.log(e)
            res.send("something went wrong")
        })
})

machineRouter.post("updatemachine",isAuth ,function(req,res){
    const user = req.session.userid
    const machineobj = req.body.machineobj
})

machineRouter.post("/insertpost", function(req,res){
    const user = req.session.userid
    //insert query
})

machineRouter.post("/getpost", function(req,res){
    const user = req.session.userid
    //insert query
})

machineRouter.post("/updatepost", function(req,res){
    const user = req.session.userid
    //insert query
})


module.exports = machineRouter;