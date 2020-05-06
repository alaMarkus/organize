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
})

partsRouter.post("/parts", function(req,res){
    const project = req.body.project
    console.log(project)
    queries.getParts(project)
        .then(result=>{
            console.log(result)
            res.send(result)
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
})

partsRouter.post("/batchcontent", function(req,res){
    const batch = req.body.batch
    console.log(batch)
    queries.getBatchContent(batch)
        .then(result => {
            console.log(result)
            res.send(result)
        })
})

module.exports = partsRouter;