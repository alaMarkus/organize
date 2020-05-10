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
machineRouter.post("/getallmachines", isAuth, function(req,res){
    queries.getAllMachines()
        .then(result=>{
            res.send(result)
        })
        .catch(function(e){
            console.log("something went wrong")
            console.log(e)
            res.send("something went wrong")
        })
})

machineRouter.post("/updatemachine",isAuth ,function(req,res){
    const user = req.session.userid
    const machineobj = req.body.machineobj
    queries.updateMachine(user,machineobj)
        .then(function(result){
            res.send("machine updated")
        })
        .catch(function(e){
            console.log("something went wrong")
            console.log(e)
            res.send("something went wrong")
        })
})

machineRouter.post("/insertpost",isAuth ,function(req,res){
    const user = req.session.userid
    const postobj = req.body.postobj
    queries.insertPost(user,postobj)
        .then(function(result){
            res.send("post inserted")
        })
        .catch(function(e){
            console.log("something went wrong")
            console.log(e)
            res.send("something went wrong")
        })
})

machineRouter.post("/getpost",isAuth ,function(req,res){
    const user = req.session.userid
    const postId = req.body.postId
        queries.getPost(user,postId)
            .then(function(result){
                res.send(result)
            })
            .catch(function(e){
                console.log("something went wrong")
                console.log(e)
                res.send("something went wrong")
            })
})

machineRouter.post("/updatepost",isAuth ,function(req,res){
    const user = req.session.userid
    const postobj = req.body.postobj
        queries.updatePost(user,postobj)
        .then(function(result){
            res.send("post updated")
        })
        .catch(function(e){
            console.log("something went wrong")
            console.log(e)
            res.send("something went wrong")
        })
})


module.exports = machineRouter;