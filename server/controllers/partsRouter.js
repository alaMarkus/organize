const partsRouter = require('express').Router()
const queries = require("../database/partsQuery")
const isAuth = require("./isAuth")

//projects
partsRouter.post("/getprojects", isAuth, function(req,res){
    const user = req.session.userid
    queries.getProjects(user)
        .then(result=>{
            console.log("why is this empty? cause there might be no data on db")
            //console.log(result)
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
            res.send("inserted project")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log(e)
        })
})
partsRouter.post("/deleteproject", isAuth, function(req,res){
    const user = req.session.userid
    const projectId = req.body.projectId
    console.log("project id:")
    console.log(projectId)
    queries.deleteProject(projectId,user)
        .then(function(result){
            console.log(result)
            res.send("deleted project")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log(e)
        })
})

// I DONT THINK I SHOULD NEED THIS
partsRouter.post("/deleteprojectwithname",isAuth,function(req,res){
    const user = req.session.userId
    const projectName = req.body.projectName
    queries.deleteProjectWithName(projectName,user)
        .then(res.send("deleted project"))
        .catch(function(e){
            res.send("something went wrong")
            console.log(e)
        })        
})


//parts
partsRouter.post("/getparts", isAuth, function(req,res){
    const user = req.session.userid
    const project = req.body.projectId
    console.log(project)
    queries.getParts(project,user)
        .then(result=>{
            //console.log(result)
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
            res.send("inserted part")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log("something went wrong")
            console.log(e)
        })
})

partsRouter.post("/deletepart",isAuth,function(req,res){
    const user = req.session.userid
    const partId = req.body.partId
    console.log("request partId: "+partId)
    queries.deletePart(user,partId)
        .then(function(result){
            console.log(result)
            res.send("part deleted")
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
    const batch = req.body.batchId
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
            res.send("created batch")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log(e)
        })
})

partsRouter.post("/deletebatch", isAuth, function(req,res){
    const user = req.session.userid
    const batchId = req.body.batchId
    queries.deleteBatch(batchId,user)
        .then(function(result){
            res.send("deleted batch")
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

partsRouter.post("/projecttobatch", isAuth, function(req,res){
    const user = req.session.userid
    const batchId = req.body.batchId
    const projectId = req.body.projectId
    queries.projectToBatch(batchId, projectId, user)
        .then(function(result){
            console.log(result)
            res.send("inserted all parts from project to batch")
        })
        .catch(function(e){
            console.log(e)
            res.send("something went wrong")
        })
})

partsRouter.post("/removepartfrombatch", isAuth, function(req,res){
    const user = req.session.userid
    const partId = req.body.partId
    const batchId = req.body.batchId
    queries.removePartFromBatch(user,partId,batchId)
        .then(function(result){
            res.send("removed part from batch")
        })
        .catch(function(e){
            res.send("something went wrong")
            console.log(e)
        })
})




module.exports = partsRouter;