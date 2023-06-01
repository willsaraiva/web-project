const { verify } = require('jsonwebtoken')
const Auth = require('../config/auth')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    if ( !authHeader ){
        return res.status(401).json({error: "jwt token is missing"})
    }
    
    // desestruturação do token
    const [, token] = authHeader.split(" ")
    
    try {
        // desencriptar o id
        const decoded = verify(token, Auth.jwt.secret)

        const { id } = decoded
        
        // associando o id a propriedade user dentro da requisição
        req.user = {id}

        return next()
    } catch (error) {
        return res.status(401).json({error: "invalid jwt token"})
    }
}

