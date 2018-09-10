const Router = require('koa-router');
const posts = require('./posts');
const api = new Router();

api.use('/posts', posts.route());

//라우터를 내보냄
module.exports = api;