const auth = require('express').Router()
const queries = require('../database/authQuery')
const {closeConnetion} = require('../database/dbConnetion')
const argon = require('argon2')
const isAuth = require('./isAuth')
const { v4: uuidv4 } = require('uuid');


auth.post("/signin", async function (req, res){
    const email = req.body.email
    const passw = req.body.passw
    const userType = req.body.userType
    const hashed = await argon.hash(passw)
    const newuid = uuidv4()
    console.log(email)
    console.log(passw)
    console.log(hashed)
    queries.signIn(email, hashed, userType, newuid)
        .then(res.send("succesfully created user with email "+email))
        .catch(function(e){
            console.log("something went wrong")
            console.log(e)
            //res.send("something went wrong")
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
                  res.send("wrong password")
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

auth.post("/logout",isAuth, function(req, res){
  req.session.destroy()
  res.send("logged out")
})

module.exports = auth;