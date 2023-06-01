const Yup = require('yup')

const User = require('../models/User')

module.exports = {

    async store(req, res) {

        // criação do schema de validação
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            contact: Yup.string().required()
        })
        
        // validação dos dados de entrada
        if( !(await schema.isValid(req.body))) {
            return res.status(400).json({error: "Wrong data"})
        }
        
        const { email } = req.body
        
        let user = await User.findOne({email}) // procurar email no bd
        if ( user ) {
            return res.status(400).json({error: "email already exist"})
        }

        // chama UserSchema.pre("save")
        user = await User.create(req.body) // salvar elemento

        // retirando a senha do retorno
        user.password = undefined

        return res.json(user)
    },

    async update (req, res) {

         // criação do schema de validação
         const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            contact: Yup.string(),
            oldPassword: Yup.string().min(8),
            password: Yup.string().min(8).when("oldpassword", (oldPassword, field) => 
                oldPassword ? field.required() : field
            )
        })

        // validação dos dados de entrada
        if( !(await schema.isValid(req.body))) {
            return res.status(400).json({error: "Wrong data"})
        }

        const { email, oldPassword } = req.body
        
        const { id } = req.user

        let user = await User.findById(id)

        // verificação do email
        if( email && (email !== user.email)) {
            const userExist = await User.findOne({ email })
            if(userExist) {
                return res.status(400).json({error: "email already exist"})
            }
        }

        // verificação da senha
        if(oldPassword && !(await user.comparePassword(oldPassword))) {
            return res.status(401).json({error: "password does not match"}) 
        }
        
        // sobreescrendo dados do user do banco
        await User.updateOne({_id:id}, req.body)

        user = await User.findById(id)
        user.password = undefined

        return res.json(user)
    }
}