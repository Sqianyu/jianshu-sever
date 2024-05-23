const mongoose = require('mongoose')

// const schema = new mongoose.Schema({
//     p1: String,
//     p2: String
// })

// const Obj = mongoose.model('names', schema)

const userSchema = new mongoose.Schema({
    username: String,
    pwd: {
        type: String,
        select: false
    },
    avatar: {
        type: String,
        default: ''
    },
    sex: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    headImg: {
        type: String,
        default: 'http://127.0.0.1:3000/images/head.png'
    }
})
const User = mongoose.model('users', userSchema)

module.exports = {
    User
}