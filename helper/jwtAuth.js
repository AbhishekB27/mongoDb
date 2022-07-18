const jwt = require('jsonwebtoken')
const secret_key = 'Golu@12345'
const createjwt = (payload)=>{
   return jwt.sign(payload,secret_key,{expiresIn:'86400s'})
}
const verifyJwt = (token)=>{
    try {
        const isVerified = jwt.verify(token,secret_key)
        if(isVerified){
           return true
        }
        else{
           return false
        }        
    } catch (error) {
        return false
    }
}
const decodeJwt = (token)=>{
    return jwt.decode(token)
}
module.exports = {
    createjwt,
    verifyJwt,
    decodeJwt
}