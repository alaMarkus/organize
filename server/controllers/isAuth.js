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

module.exports = isAuth;