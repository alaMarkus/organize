require('dotenv').config()
const express = require('express');
const cors = require('cors')
const session = require('express-session')
const matchRouter = require('./logic/matchRouter')
const partsRouter = require("./controllers/partsRouter")
const machineRouter = require("./controllers/machineRouter")
const orderRouter = require("./controllers/orderRouter")
const auth = require("./controllers/authRouter")
const testRouter = require('./controllers/testRouter')
const path = require('path');

const app = express()
const port = 8083;

console.log(process.env.SECRET)

const corsOptions = {
    origin: "http://95.216.173.144:8083",
    optionsSuccesStatus:200,
    credentials: true
}

app.use(cors(corsOptions))

app.use(express.static(path.join("../client", 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join("../client", 'build', 'index.html'));
});

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