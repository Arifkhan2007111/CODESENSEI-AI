const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    UserName : {type: String},
    Email : {type: String},
    Password : {type: String}
})

const User = mongoose.model('user', schema)

module.exports = User