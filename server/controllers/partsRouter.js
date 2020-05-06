const partsRouter = require('express').Router()
const queries = require("../database/dbquery")

partsRouter.post("/projects", function(req,res){
    const user = req.body.user
    console.log(user)
    queries.getProjects(user)
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

partsRouter.post("/parts", function(req,res){
    const project = req.body.project
    console.log(project)

    queries.getParts(project)
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

partsRouter.post("/batches", function(req, res){
    const user = req.body.user
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

partsRouter.post("/batchcontent", function(req,res){
    const batch = req.body.batch
    console.log(batch)
    queries.getBatchContent(batch)
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

partsRouter.post("/insertpart", function(req, res,){
    const part = req.body.partobj
    //console.log(part)
    queries.insertPart(part)
        .then(function(result){
            res.send("inserted part succesfully")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log("something went wrong")
            console.log(e)
        })
})

partsRouter.post("/insertproject", function(req, res){
    const user = req.body.user
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

partsRouter.post("/insertbatch", function(req,res){
    const user = req.body.user
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

partsRouter.post("/addtobatch", function(req,res){
    const batchId = req.body.batchId
    const partId = req.body.partId
    queries.partToBatch(batchId,partId)
        .then(function(result){
            res.send("inserted part to batch")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log(e)
        })
})

module.exports = partsRouter;