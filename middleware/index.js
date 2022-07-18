const jwtAuth = require('../helper/jwtAuth')
const isAuthorised = (req,res,next)=>{
    try {
    const token = req.headers['auth']
    if(jwtAuth.verifyJwt(token)){
        return next()
    }
    else{
        return res.status(404).json({"status":"false","result":"Access Denied"})
    }
    } catch (error) {
        res.status(404).send(error.message)
    }
}
module.exports = isAuthorised