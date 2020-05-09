const machineRouter = require('express').Router();
const queries = require("../database/manudb");

machineRouter.post("/insertmachine", function(req,res){
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

machineRouter.post("/getmachine", function(req,res){
    const user = req.session.userid
    //insert query
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