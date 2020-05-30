module.exports = (req, res, next) => {

    if (req.url != '/login' && !req.session.username) { // 判断用户访问的是否是登录页面与 登录状态
        res.redirect('/admin/login');
    } else {
        if (req.session.role == 'normal') { // 如果用户是登录状态 并且是一个普通用户 
            return res.redirect('/home/') // 让它跳转到博客首页 阻止程序向下执行，必须return
        }
        next(); // 用户是登录状态并且是超级管理员 将请求放行
    }
}