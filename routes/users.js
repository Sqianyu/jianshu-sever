const router = require('koa-router')()
const {User} = require('../modules/user')
const userCtl = require('../controller/user')
router.prefix('/users')

//登陆
router.post('/login', userCtl.login)
//注册
router.post('/reg', userCtl.reg)
//验证登录
router.post('/verify', userCtl.verify)
//修改资料
router.post('/update/pwd', userCtl.updatePwd)
//updatePersonal
router.post('/update/personal', userCtl.updatePersonal)
//添加
router.post('/add', userCtl.userAdd)

//修改
router.post('/update', userCtl.userUpdate)

//删除
router.post('/del', userCtl.userDel)

//查询所以
router.post('/userFindList', userCtl.userFindList)
//查询单个
router.post('/userFind', userCtl.userFind)
module.exports = router
