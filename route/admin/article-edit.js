const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    const { id } = req.query;
    if (id) {
        //修改操作
        const article = await Article.findOne({ _id: id })
        res.render('admin/article-edit.art', {
            link: 'article-modify?id=' + id,
            article,
            button: '修改',

        })
    } else {
        //添加操作
        res.render('admin/article-edit.art', {
            link: 'article-add',
            button: '添加',
        }); //直接渲染
    }




}