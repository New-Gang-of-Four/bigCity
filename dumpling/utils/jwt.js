const jwt = require('jsonwebtoken');

const screat = 'dfjgherigdjfg;fkdjgeirjgeirn;dsfdjkgh'

module.exports={
    createToken(payload,expires){
        let token = jwt.sign(payload,screat,{expiresIn:expires})
        return token 
    },
    verifyToken(token){
        return jwt.verify(token,screat)
    }
}