/*封装调用数据库文件的
增 add
删 delete
改 update
查 show
方法*/
var db = './studentDB.json';
var fs = require('fs');
/*默认显示学生信息*/
exports.show = function (callback) {
    fs.readFile(db,'utf8',function (err,data) {
        if (err){
            return callback(err);
        } 
        callback(null,data);
    })
};


