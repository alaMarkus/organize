const partsRouter = require('express').Router()
const queries = require("../database/dbquery")

const isAuth = (req,res,next) =>{
    if (req.session.email){
        console.log("req.session.email = true")
        console.log(req.session.email)
        const user = req.session.userid
        console.log(user)
        return next();
    }else{
        console.log("unathenticated request")
        res.send("unauthenticated request")
    }
  }

partsRouter.post("/useridtest", function(req,res){
    queries.getUserId("toimiikos@hotmail.com")
        .then(result=>{
            console.log(result)
            res.send("thiswasproblem")
        })
})

partsRouter.post("/projects", isAuth, function(req,res){
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

partsRouter.post("/parts", isAuth, function(req,res){
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

partsRouter.post("/batches", isAuth, function(req, res){
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

partsRouter.post("/batchcontent", isAuth, function(req,res){
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

partsRouter.post("/insertpart", isAuth, function(req, res,){
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

partsRouter.post("/addtobatch", isAuth, function(req,res){
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