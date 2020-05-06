const express = require('express');
const partsRouter = require("./controllers/partsRouter")
const app = express()
const port = 8083;

app.listen(port, () => console.log("listening on port "+port))
app.use(express.json())
app.use("/api", partsRouter)

module.exports = app;