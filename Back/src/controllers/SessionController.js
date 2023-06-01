const Yup = require('yup')
const User = require('../models/User')
const Token = require('jsonwebtoken')
const Auth = require('../config/auth')

module.exports = {

    async store (req, res) {
        
        // criação do schema de validação
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        })

        // validação dos dados de entrada
        if( !(await schema.isValid(req.body))) {
            return res.status(400).json({error: "Wrong data"})
        }

        const { email, password } = req.body

        // busca usuário
        let user = await User.findOne({email})
        if ( !user ) {
            return res.status(400).json({error: "email not exist"})
        }
        
        // verifica se a senha do usuário é correta
        if ( ! (await user.comparePassword(password))) {
            return res.status(400).json({error: "Wrong password "})
        }

        const { _id: id } = user
        
        const { secret, expiresIn } = Auth.jwt
        
        user.password = undefined

        return res.json({
            user,
            token: Token.sign({id}, secret, {expiresIn}) // encriptar id
        })
    }

}