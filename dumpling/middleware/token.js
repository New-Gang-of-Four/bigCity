const jwt = require('../utils/jwt')

module.exports = (req,res,next)=>{
    console.log('token',req.path,req.headers)
    if(req.path === '/user/login'||req.path === '/user/getCode'||req.path === '/question/answer'){
        next()
    }else{
        let {token} = req.body
        if(!token) return res.send({err:-997,msg:'token缺失'})
        try{
            jwt.verifyToken(token)
            next()
        }catch (error){
            res.send({err:-998,msg:'token失效'})
        }
    }
}