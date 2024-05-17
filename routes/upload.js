const router = require('koa-router')()
const multer = require('koa-multer')
const fs = require('fs')
const path = require('path')
router.prefix('/upload')

let storage = multer.diskStorage({
    //存储位置
    destination: function(req, file, cb){
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let dir = "./public/upload/" + year + month + day

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir,{
                recursive: true
            })
        }
        console.log(dir);
        cb(null, dir)
    },
    filename: function(req, file, cb){
        let fileName = file.filename + '-' + Date.now() + path.extname(file.originalname) 
        cb(null, fileName)
    }
})
const upload = multer({ storage: storage })
router.post('/img', upload.single('myfile'), async ctx => {

    ctx.body = {
        data: ctx.req.file
    }
})

module.exports = router