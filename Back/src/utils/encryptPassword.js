const bcrypt = require('bcryptjs')

module.exports = {

    // encriptar senha
    encrypt(password) {
        return bcrypt.hash(password, 8)
    },

    // comparar senha
    compare(password, passwordHash) {
        return bcrypt.compare(password, passwordHash)
    }
}