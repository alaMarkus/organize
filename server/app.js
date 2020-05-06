require('dotenv').config()
const express = require('express');
const partsRouter = require("./controllers/partsRouter")
const auth = require("./controllers/auth")
const app = express()
const port = 8083;

console.log(process.env.SECRET)

app.listen(port, () => console.log("listening on port "+port))
app.use(express.json())

app.use("/api", partsRouter)
app.use("/auth", auth)

module.exports = app;