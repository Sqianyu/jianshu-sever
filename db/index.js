const mongoose = require('mongoose')

module.exports = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/jianshu',{useUnifiedTopology: true,useNewUrlParser: true}).then(()=>{
        console.log('连接成功');
    }).catch(err => {
        console.error('连接失败',err)
    })
}