const orderRouter = require('express').Router()
const isAuth = require('../controllers/isAuth')
const queries = require('../database/orderQuery')

orderRouter.post("/createorder",isAuth,function(req,res){
    const user = req.session.userid
    const batchId = req.body.batchId
        queries.createOrder(user,batchId)
            .then(function(result){
                res.send("order created")
            })
            .catch(function(e){
                res.send("something went wrong")
                console.log("something went wrong")
                console.log(e)
            })
})
orderRouter.post("/getordercontent",isAuth,function(req,res){
    const batchId = req.body.batchId
        queries.getOrderContent(batchId)
            .then(function(result){
                console.log(result)
                res.send(result)
            })
            .catch(function(e){
                res.send("something went wrong")
                console.log("something went wrong")
                console.log(e)
            })
})

orderRouter.post("/getpartfororder", isAuth, function(req,res){
    const partId = req.body.partId
        queries.getPartForOrder(partId)
            .then(function(result){
                res.send(result)
            })
            .catch(function(e){
                res.send("something went wrong")
                console.log("something went wrong")
                console.log(e)
            })
})


module.exports = orderRouter