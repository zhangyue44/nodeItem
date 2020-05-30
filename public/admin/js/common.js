function serializeToJson(form) {
    var result = {};
    var f = form.serializeArray(); //获取form表单中用户输入的所有内容，返回一个数组 [{name: 'email', value: '用户输入的内容'}]
    f.forEach(function(item) {
        // result.email
        result[item.name] = item.value;
    });
    return result;
}