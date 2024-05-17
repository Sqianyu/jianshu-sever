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
        username: user.username,
        _id: rel._id
      }, 'jianshu-server-jwt',{
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
        msg: '用户名或密码错误'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 300,
      msg: '登录时出现异常',
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
  await  User.create({username, pwd}).then(rel => {
    if (rel) {
      ctx.body = {
        code: 200,
        msg: '注册成功'
      }
    } else {
      ctx.body = {
        code: 300,
        msg: '注册失败'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 300,
      msg: '注册时出现异常',
      err
    }
  });
};

const verify = async (ctx) => {

  let token = ctx.header.authorization;
  token = token.split(" ")[1];

  let result = jwt.verify(token,'jianshu-server-jwt')
    await  User.findOne({_id: result._id}).then(rel => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: '用户认证成功',
          user: rel
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '用户认证失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '用户认证时出现异常'
      }
    });

};

//修改密码
const updatePwd = async (ctx) => {
  let {username, pwd} = ctx.request.body;
  await  User.updateOne({username},{pwd}).then(rel => {
    if (rel.n > 0) {
      ctx.body = {
        code: 200,
        msg: '修改密码成功',
        user: rel
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '修改密码失败'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      msg: '修改密码时出现异常'
    }
  });
}
//修改资料
const updatePersonal = async (ctx) => {
  let {_id = '',avatar = '',sex = '',desc = '',phone = '',email = ''} = ctx.request.body;
  await  User.updateOne(
    {_id},
    {
      avatar,
      sex,
      desc,
      phone,
      email,
    }
  ).then(rel => {
    if (rel.n > 0) {
      ctx.body = {
        code: 200,
        msg: '更新资料成功',
        user: rel
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '更新资料失败'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      msg: '更新资料时出现异常'
    }
  });
}
module.exports = { userAdd, userUpdate, userDel, userFind, userFindOne, login, reg, verify, updatePwd, updatePersonal };
