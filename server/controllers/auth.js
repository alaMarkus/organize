const auth = require('express').Router()
const queries = require('../database/dbquery')
const argon = require('argon2')
const { v4: uuidv4 } = require('uuid');


auth.post("/signin", async function (req, res){
    const email = req.body.email
    const passw = req.body.passw    
    const hashed = await argon.hash(passw)
    const newuid = uuidv4()
    console.log(email)
    console.log(passw)
    console.log(hashed)

    queries.signIn(email, hashed, newuid)
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
            const hash = result[0].password
            try {
                if (await argon.verify(hash, passw)) {
                  console.log("password correct")
                  queries.getUserId(email)
                    .then(result=>{
                        console.log(result)
                        req.session.email = email;
                        req.session.userid = result[0].secId;
                        res.send("welcome in")
                    })
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
})

auth.post("/logout", function(req, res){

})

module.exports = auth;