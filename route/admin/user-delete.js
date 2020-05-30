const { User } = require('../../model/user');

module.exports = async(req, res) => {

    await User.findOneAndDelete({ _id: req.query.id });

    res.redirect('/admin/user'); // 将页面重定向到用户列表页面
}