const express = require('express'); // 引用expess框架

const admin = express.Router(); // 创建博客展示页面路由

admin.get('/login', require('./admin/loginPage')); // 渲染登录页面

admin.post('/login', require('./admin/login')); // 实现登录功能

admin.get('/logout', require('./admin/logout')); // 实现退出功能

admin.get('/delete', require('./admin/user-delete')); // 用户删除功能路由

admin.get('/user', require('./admin/userPage')); // 创建用户列表路由

admin.get('/user-edit', require('./admin/user-edit')); // 创建用户编辑页面路由

admin.post('/user-edit', require('./admin/user-edit-fn')); // 创建实现用户添加功能路由

admin.post('/user-modify', require('./admin/user-modify')); // 用户修改功能路由



admin.get('/article', require('./admin/article')); // 文章列表页面路由

admin.get('/article-edit', require('./admin/article-edit')); // 文章编辑页面路由

admin.post('/article-modify', require('./admin/article-modify')); // 文章修改功能路由

admin.post('/article-add', require('./admin/article-add')) // 实现文章添加功能的路由

admin.get('/article-delete', require('./admin/article-delete')) //文章删除

// 将路由对象做为模块成员进行导出
module.exports = admin;