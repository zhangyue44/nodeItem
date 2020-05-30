const { Article } = require('../../model/article');
const formidable = require('formidable');
const path = require('path');

module.exports = (req, res) => {
    const id = req.query.id;
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    form.keepExtensions = true;
    form.parse(req, async(err, fields, files) => {
        await Article.updateOne({ _id: id }, {
            title: fields.title,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content,
        });
        res.redirect('/admin/article');
    })
}