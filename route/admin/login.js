const { User } = require('../../model/user'); // 导入用户集合构造函数
const bcrypt = require('bcrypt'); //导入密码加密模块

module.exports = async(req, res) => {

    const { email, password } = req.body; // 接收表单传递过来的请求参数
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' });

    let user = await User.findOne({ email }); //验证用户是否存在
    if (user) {
        let isValid = await bcrypt.compare(password, user.password); // true 比对成功 false 对比失败

        if (isValid) { // 如果密码比对成功，登录成功			
            req.session.username = user.username; // 将用户名存储在session对象中
            req.session.role = user.role; // 将用户角色存储在session对象中
            req.app.locals.userInfo = user; //存储全局变量，在所有模板中都可以获取到

            if (user.role == 'admin') { // 对用户的角色进行判断

                res.redirect('/admin/user'); // 重定向到用户列表页面
            } else {

                res.redirect('/home/'); // 重定向到博客首页
            }
        } else {
            // 没有查询到用户
            res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
        }
    } else {
        // 没有查询到用户
        res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }
}