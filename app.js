var express = require('express');
var app = express();
//加载router文件
var router = require('./router');
app.use('/public',express.static('./public/'));
app.engine('html',require('express-art-template'));
//挂载router到app服务中
app.use(router);

app.listen('3000',function () {
    console.log('server is running.......');
})