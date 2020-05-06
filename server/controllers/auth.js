const auth = require('express').Router()
const queries = require('../database/dbquery')
const argon = require('argon2')

auth.post("/signin", async function (req, res){
    const email = req.body.email
    const passw = req.body.passw    
    const hashed = await argon.hash(passw)

    console.log(email)
    console.log(passw)
    console.log(hashed)

    queries.signIn(email, hashed)
        .then(res.send("succesfully created user with email "+email))
        .catch(function(e){
          res.send("something went wrong")
          console.log("something went wrong")
          console.log(e)
      })
})

auth.post("/login", async function(req, res){
    const email = req.body.email
    const passw = req.body.passw
    console.log(email)

    queries.logIn(email)
        .then(async result => {
            const hash = result[0].Password
            try {
                if (await argon.verify(hash, passw)) {
                  console.log("password correct")
                } else {
                  console.log("wrong password")
                }
              } catch (err) {
                console.log("ERROR: ")
                console.log(err)
              }
        })
        .catch(function(e){
          res.send("something went wrong")
          console.log("something went wrong")
          console.log(e)
      })
    res.send("test")
})

auth.post("/logout", function(req, res){

})

module.exports = auth;