const { User } = require("../modules/user");
const util = require("./util");
let jwt = require('jsonwebtoken')
// 添加
const userAdd = async (ctx) => {
  let { username = "", pwd = "" } = ctx.request.body;
  await util.add(User,{ username, pwd },ctx);
};

const userUpdate = async (ctx) => {
  let params = ctx.request.body;
  let where = {_id: params._id};
  let param = {username: params.username,pwd: params.pwd}
  await util.update(User,where,param,ctx);
};

const userDel = async (ctx) => {
  let { _id } = ctx.request.body;
  await util.del(User,{_id},ctx)
};

const userFind = async (ctx) => {
  await util.find(User,null,ctx);
};

const userFindOne = async (ctx) => {
  await  util.findOne(User,{ _id: ctx.params.id },ctx);
};

const login = async (ctx) => {
  let {username, pwd} = ctx.request.body;
  await  User.findOne({username, pwd}).then(rel => {
    if (rel) {
      let user = {
        username: 'admin',
        pwd: '123'
      }
      let token = jwt.sign({
        username: user.username
      }, 'jianshu-sever-jwt',{
        expiresIn: 3600 * 24 * 7
      })

      ctx.body = {
        code: 200,
        msg: '登录成功',
        token
      }
    } else {
      ctx.body = {
        code: 300,
        msg: '登录失败'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 300,
      msg: '登录异常',
      err
    }
  });
};

const reg = async (ctx) => {
  let {username, pwd} = ctx.request.body;
  let isDouble = false;
  await  User.findOne({username}).then(rel => {
    if (rel) isDouble = true
  })

  if (isDouble) {
    ctx.body = {
      code: 300,
      msg: '用户名已存在'
    }
    return 
  }
  userAdd()
};

module.exports = { userAdd, userUpdate, userDel, userFind, userFindOne, login, reg };
