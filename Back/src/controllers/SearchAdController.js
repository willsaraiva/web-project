const Yup = require('yup')

const Ad = require('../models/Ad')

module.exports = {

    async show (req, res) {
        const schema = Yup.object().shape({
            areaOfInterest: Yup.string().required(),
            page: Yup.number(),
        });
      
        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { areaOfInterest, page = 1 } = req.query
        
        const ads = await Ad.paginate({ areaOfInterest }, { page, limit:8, populate: 'userId' })

        ads.docs.map((ad) =>
            Object.assign(ad.userId, { password: undefined, email: undefined })
        );

        return res.json(ads)
    },

    async index (req, res) {        
        const { userId } = req.params
        const { page = 1 } = req.query

        const ads = await Ad.paginate({ userId }, { page, limit: 8, populate: 'userId' })

        ads.docs.map((ad) =>
            Object.assign(ad.userId, { password: undefined})
        );

        return res.json(ads)
    }

}