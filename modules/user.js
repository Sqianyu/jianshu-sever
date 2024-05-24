const mongoose = require('mongoose')

// const schema = new mongoose.Schema({
//     p1: String,
//     p2: String
// })

// const Obj = mongoose.model('names', schema)
const url = process.env.npm_lifecycle_event == 'prd' ? 'http://39.101.1.217:3000' : 'http://127.0.0.1:3000'
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
        default: url + '/images/head.png'
    }
})
const User = mongoose.model('users', userSchema)

module.exports = {
    User
}