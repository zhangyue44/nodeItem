// 引入用户集合的构造函数
const { User, validateUser } = require('../../model/user');
// 引入加密模块
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {

    try {
        await validateUser(req.body)
    } catch (e) {
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message })) // 验证没有通过 e.message
    }

    let user = await User.findOne({ email: req.body.email }); // 根据邮箱地址查询用户是否存在

    if (user) { // 如果用户已经存在 邮箱地址已经被别人占用
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }))
    }

    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt.hash(req.body.password, salt);

    req.body.password = password;

    await User.create(req.body); // 将用户信息添加到数据库中

    res.redirect('/admin/user'); // 将页面重定向到用户列表页面
}