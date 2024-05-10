const add = (model, params, ctx) =>
  model
    .create(params)
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "添加成功",
          data: rel,
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "添加失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 400,
        msg: "添加异常",
      };
      console.error(err);
    });

const update = (model, where, params, ctx) =>
  model
    .updateOne(where, params)
    .then((rel) => {
      ctx.body = {
        result: rel,
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 400,
        msg: "添加异常",
      };
      console.error(err);
    });

const del = (model, where, ctx) =>
  model
    .findOneAndDelete(where)
    .then((rel) => {
      ctx.body = {
        result: rel,
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 400,
        msg: "删除异常",
      };
      console.error(err);
    });
    
/**
 * 同于查询所有
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @returns
 */
const find = (model, where, ctx) =>
  model
    .find(where)
    .then((rel) => {
      ctx.body = {
        result: rel,
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 400,
        msg: "查询异常",
      };
      console.error(err);
    });

const findOne = (model, where, ctx) =>
  model
    .findOne(where)
    .then((rel) => {
      ctx.body = {
        result: rel,
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 400,
        msg: "查询异常",
      };
      console.error(err);
    });
module.exports = { add, find, update, del, findOne };
