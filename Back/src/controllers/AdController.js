const Yup = require('yup')
const Ad = require('../models/Ad')

module.exports = {

    async store(req, res) {
        // criação do schema de validação
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            areaOfInterest: Yup.string().required(),
            description: Yup.string().required(),
            link_img: Yup.string().required()
        })

        // validação dos dados de entrada
        if( !(await schema.isValid(req.body))) {
            return res.status(400).json({error: "Wrong data"})
        }

        const { id } = req.user

        Object.assign(req.body, { userId: id })
        
        const ad = await Ad.create(req.body) // salvar elemento

        return res.json(ad)
    },

    async update (req, res) {
         // criação do schema de validação
        const schema = Yup.object().shape({
            name: Yup.string(),
            price: Yup.number(),
            areaOfInterest: Yup.string(),
            description: Yup.string(),
            link_img: Yup.string()
        })

        // validação dos dados de entrada
        if( !(await schema.isValid(req.body))) {
            return res.status(400).json({error: "Wrong data"})
        }

        const { id } = req.params

        const ad = await Ad.findByIdAndUpdate({ _id: id }, req.body, { new: true })

        return res.json(ad)
    },

    // mostrar anuncios do usuário
    async show (req, res) {
        const { id } = req.user
        const { page = 1 } = req.query
    
        // filtro {userId: id}
        const ads = await Ad.paginate({ userId: id }, {page, limit:8})

        return res.json(ads)
    },

    async index (req, res) {
        const { id } = req.params
    
        const ad = await Ad.findById(id).populate('userId');
        Object.assign(ad.userId, { password: undefined });
    
        return res.json(ad);
    },

    // deletar anuncio associado a usuário
    async destroy (req, res) {
        const { id } = req.params 

        const { id: userId } = req.user

        await Ad.findOneAndDelete({ _id: id, userId })

        return res.status(200).json()
    }   
}