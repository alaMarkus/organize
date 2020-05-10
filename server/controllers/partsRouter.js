const partsRouter = require('express').Router()
const queries = require("../database/dbquery")
const isAuth = require("./isAuth")

//projects
partsRouter.post("/getprojects", isAuth, function(req,res){
    const user = req.session.userid
    queries.getProjects(user)
        .then(result=>{
            console.log("why is this empty? cause there might be no data on db")
            console.log(result)
            res.send(result)
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log("something went wrong")
            console.log(e)
        })
})
partsRouter.post("/insertproject", isAuth, function(req, res){
    const user = req.session.userid
    const projectName = req.body.projectName
    queries.insertProject(user, projectName)
        .then(function(result){
            res.send("inserted project succesfully")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log(e)
        })
})


//parts
partsRouter.post("/getparts", isAuth, function(req,res){
    const user = req.session.userid
    const project = req.body.project
    console.log(project)
    queries.getParts(project,user)
        .then(result=>{
            console.log(result)
            res.send(result)
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log("something went wrong")
            console.log(e)
        })
})

partsRouter.post("/getpart", isAuth, function(req,res){
    const user = req.session.userid
    const part = req.body.partId
    console.log(part)
    queries.getPart(part,user)
        .then(result=>{
            console.log(result)
            res.send(result)
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log("something went wrong")
            console.log(e)
        })
})

partsRouter.post("/insertpart", isAuth, function(req, res,){
    const part = req.body.partobj
    const user = req.session.userid
    //console.log(part)
    queries.insertPart(user,part)
        .then(function(result){
            res.send("inserted part succesfully")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log("something went wrong")
            console.log(e)
        })
})


//batches
partsRouter.post("/getbatches", isAuth, function(req, res){
    const user = req.session.userid
    console.log(user)
    queries.getBatches(user)
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log("something went wrong")
            console.log(e)
        })
})
partsRouter.post("/getbatchcontent", isAuth, function(req,res){
    const user = req.session.userid
    const batch = req.body.batch
    console.log(batch)
    queries.getBatchContent(user,batch)
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log("something went wrong")
            console.log(e)
        })
})
partsRouter.post("/insertbatch", isAuth, function(req,res){
    const user = req.session.userid
    const batchName = req.body.batchName
    queries.insertBatch(user, batchName)
        .then(function(result){
            res.send("created batch succesfully")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log(e)
        })
})
partsRouter.post("/parttobatch", isAuth, function(req,res){
    const user = req.session.userid
    const batchId = req.body.batchId
    const partId = req.body.partId
    queries.partToBatch(user,batchId,partId)
        .then(function(result){
            res.send("inserted part to batch")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log(e)
        })
})




module.exports = partsRouter;