function jsonp(options) {
    //创建动态script标签
    var scriptNode = document.createElement('script');
    //遍历data属性
    var params = '';
    for (var k in options.data) {
        params += '&' + k + '=' + options.data[k];
    }
    //设置fnName为一个随机变量
    var fnName = 'myJsonp' + Math.random().toString().replace('.', '');
    //将fnName变成一个全局函数
    window[fnName] = options.success;

    //设置src属性
    scriptNode.src = options.url + '?callback=' + fnName + params;
    //将scriptNode 追加带页面中
    document.body.appendChild(scriptNode);
    //当jsonp响应完清除scriptNode
    scriptNode.onload = function() {
        document.body.removeChild(scriptNode);
    }
}

//调用函数
// jsonp({
//     url: 'http://127.0.0.1:3000',
//     data: {
//         name: 'zhangsan',
//         age: 18
//     },
//     success: function (res) {
//         console.log(res);
//     }
// })