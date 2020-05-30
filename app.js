const express = require('express'); // 引用expess框架
const app = express(); // 创建网站服务器

const path = require('path'); // 处理路径

const template = require('art-template'); // 导入art-tempate模板引擎

const dateFormat = require('dateformat'); // 导入dateformat第三方模块，用来处理日期

const bodyPaser = require('body-parser'); // 引入body-parser模块 用来处理post请求参数

const session = require('express-session'); // 导入express-session模块,用来处理cookie与session功能

require('./model/connect'); // 数据库连接

app.use(bodyPaser.urlencoded({ extended: false })); // 处理post请求参数

template.defaults.imports.dateFormat = dateFormat; // 向模板内部导入dateFormate变量

app.use(session({ // 配置session
    secret: 'secret key', //必有属性
    saveUninitialized: false, //删除cookies后，cookies在浏览器中就不保存了
    cookie: { //cookie在浏览器保存的最长时间，以毫秒为单位
        maxAge: 24 * 60 * 60 * 1000 //一天，如果一天后未登录，自动删除
    }
}));

app.set('views', path.join(__dirname, 'views')); // 告诉express框架模板所在的位置，第一个参数views是固定参数，express-art-template模板引擎自带
app.set('view engine', 'art'); // 告诉express框架模板的默认后缀是什么
app.engine('art', require('express-art-template')); // 当渲染后缀为art的模板时 所使用的模板引擎是什么

app.use(express.static(path.join(__dirname, 'public'))); // 开放静态资源文件,必须是绝对路径

const home = require('./route/home'); // 引入路由模块
const admin = require('./route/admin');

app.use('/home', home); // 为路由匹配请求路径
app.use('/admin', admin);

app.use('/admin', require('./middleware/loginGuard')); // 拦截请求 判断用户登录状态

app.use((err, req, res, next) => { //有错误时的拦截请求

    const result = JSON.parse(err); //传递过来的err是字符串类型， 要转化为对象类型
    // 例 {path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改', id: id}
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

// 监听端口
app.listen(80);
console.log('网站服务器启动成功, 请访问localhost')