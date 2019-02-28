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
};

//修改学生信息

exports.find = function (id, callback) {
    fs.readFile(db, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var result = students.find(function (item) {
            return item.id === parseInt(id)
        })
        console.log(result);
        callback(null,result)
    })
}

exports.update = function (student,callback) {
    fs.readFile(db,'utf8',function (err,data) {
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;
       // console.log("要修改学生的学号"+student.sno);
        //console.log("数据库学生的学号"+students.sno);//undefined
        student.id = parseInt(student.id);
        //student接收要修改学生信息,通过id条件
        var upstudent = students.find(function (item) {
            return item.id === student.id;
        })

        //打印出upstudent的值
        console.log("要修改学生的信息"+upstudent);
        /*将修改之后的值替换*/
        for (var key in student) {
            upstudent[key] = student[key]
        }
        console.log("upstudent[key]"+upstudent[key])
        var studentdate = JSON.stringify({
            students: students
        })

        // 把字符串保存到文件中
        fs.writeFile(db, studentdate, function (err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是 null
            callback(null)
        })
    })
};

/*
* 删除学生信息
* */
exports.delete = function (id, callback) {
    fs.readFile(db, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students;
        var deleteID = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })
        // 根据下标从数组中删除对应的学生对象

        students.splice(deleteID, 1)

        // 把对象数据转换为字符串
        var destudent = JSON.stringify({
            students: students
        })
        fs.writeFile(db, destudent, function (err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是 null
            callback(null)
        })
    })
}
