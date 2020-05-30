// 导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async(req, res) => {

    req.app.locals.currentLink = 'user'; // 标识 标识当前访问的是用户管理页面

    let page = req.query.page || 1; // 接收客户端传递过来的当前页参数

    let pagesize = 10; // 每一页显示的数据条数

    let count = await User.countDocuments({}); // 查询用户数据的总数

    let total = Math.ceil(count / pagesize); // 总页数

    let start = (page - 1) * pagesize; // 页码对应的数据查询开始位置

    let users = await User.find({}).limit(pagesize).skip(start) // 将用户信息从数据库中查询出来

    res.render('admin/user', { // 渲染用户列表模块
        users,
        page,
        total,
        count,
    });
}