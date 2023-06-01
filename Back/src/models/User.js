const mongodb = require('mongoose')
const encrypt = require('../utils/encryptPassword')

const UserSchema = mongodb.Schema({
    name: {
        type: String,
        required : "Name required"
    },
    email: {
        type: String,
        required : "Email required",
        unique: true,
        trim: true // limpar espaços em branco
    },
    password: {
        type: String,
        required : "Password required"
    },
    contact: {
        type: String,
        required : "Contato required"
    }
})

// encriptar senha antes de salvar
UserSchema.pre("save", async function save(next) {
    const user = this
    user.password = await encrypt.encrypt(user.password)
    next()
})

// encriptar antes de update
UserSchema.pre("updateOne", async function updateOne(next) {
    const user = this._update
    if ( user.oldPassword ) {
        user.password = await encrypt.encrypt(user.password)
    }
    next()
})

UserSchema.pre("deleteOne", async function updateOne(next) {
    const user = this
    await mongodb.Model('Ad').deleteMany({ userId: user._id });
    next();
})

UserSchema.methods = {
    comparePassword(password) {
        return encrypt.compare(password, this.password)
    }
}

// nome do banco e schema utilizado
module.exports = mongodb.model('User', UserSchema)