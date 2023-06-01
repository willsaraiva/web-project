const mongodb = require('mongoose')
const mongoosepaginate = require('mongoose-paginate')

const AdSchema = mongodb.Schema({
    name: {
        type: String,
        required : "Name required"
    },
    price: {
        type: Number,
        required : "Price required",
    },
    areaOfInterest: {
        type: String,
        required : " required",
    },    
    description: {
        type: String,
        required : "Description required"
    },
    link_img: {
        type: String,
        required : "Description required"
    },
    userId: {
        type: mongodb.Schema.Types.ObjectId, ref:"User"
    }
})

AdSchema.plugin(mongoosepaginate)

// nome do banco e schema utilizado
module.exports = mongodb.model('Ad', AdSchema)