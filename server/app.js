require('dotenv').config()
const express = require('express');
const session = require('express-session')
const matchRouter = require('./logic/matchRouter')
const partsRouter = require("./controllers/partsRouter")
const machineRouter = require("./controllers/machineRouter")
const orderRouter = require("./controllers/orderRouter")
const auth = require("./controllers/authRouter")
const testRouter = require('./controllers/testRouter')
const app = express()
const port = 8083;

console.log(process.env.SECRET)

app.listen(port, () => console.log("listening on port "+port))
app.use(express.json())

app.use(session({
    secret: process.env.SECRET,
    secure: false,
    resave: false,
    saveUninitialized: false,
}))

app.use("/api/order", orderRouter)
app.use("/test",testRouter)
app.use("/api", matchRouter)
app.use("/api/machine", machineRouter)
app.use("/api/part", partsRouter)
app.use("/auth", auth)

module.exports = app;