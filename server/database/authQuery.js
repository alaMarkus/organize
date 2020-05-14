const {insertGet, signInQuery} = require('./dbConnetion')

//signinlogin
exports.signIn = (email, pwhash,userType,newuid) => {
    const sql = "INSERT INTO login (username, password ) VALUES (?,?)"
    const sql2 = "INSERT INTO userdata (username, userType, secId) VALUES (?,?,?)"
    const args = [email,pwhash]
    const args2 = [email,userType,newuid]
    return signInQuery(sql,sql2,args,args2)
}
exports.logIn = (email) => {
    const sql = "SELECT password FROM login WHERE username = ?"
    const args = [email]
    return insertGet(sql, args)
}

exports.getUserId  = (username) => {
    const sql = "SELECT secId FROM userdata WHERE username = (?)"
    const args = [username]
    return insertGet(sql, args)
}

