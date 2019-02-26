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
        callback(null, data);
    })
};
/*增加的学生信息*/
exports.add = function (newstudent,callback) {
    fs.readFile(db,'utf8',function (err,data) {
        if (err){
            return callback(err);
        }
        var students = JSON.parse(data).students;
        //添加顺序的ID
        newstudent.id = students[students.length - 1].id + 1;
        //新增加的学生信息添加到读取的数据库中
        students.push(newstudent);
        //将新增的学生信息转化成字符串形式
        var allstudent = JSON.stringify({
            students: students
        });
        //将结果写入数据库中
        fs.writeFile(db,allstudent,function (err) {
            if (err){
                return callback(err);
            }
            callback(null);
        });
        });

}
