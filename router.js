var express = require('express');

var fs = require('fs');

var comment = require('./comment');

//加载express中的Router方法
var router = express.Router();

router.get('/',function (req,res) {
   /* fs.readFile('./studentDB.json',function (err,data) {
        if (err){
            return res.status(500).send('数据读取失败');
        };
        //console.log(typeof data);string类型，结果应该转化为object
        //console.log(typeof JSON.parse(data));object
        res.render('./index.html',{
            students:JSON.parse(data).students
        });
    });*/
    comment.show(function (err,data) {
        if (err){
            return res.status(500).send('学生读取数据失败');
        }
        res.render('./index.html',{
           students:JSON.parse(data).students
        })
    })
});

router.get('/new.html',function (req,res) {
    res.render('./new.html');
});

router.post('/new.html',function (req,res) {
    comment.add(req.body,function (err) {
        if (err){
            return res.status(500).send('添加学生数据失败');
        }
        res.redirect('./');
    });
});

router.get('/update.html',function (req,res) {
   comment.find(req.query.id,function (err,student) {
       if (err){
           return res.status(500).send('读取学生信息失败');
       }
       res.render('./update.html', {
           student: student
       })
   })
});

router.post('/update.html', function (req, res) {
   comment.update(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/')
    })
});

router.get('/delete.html',function (req,res) {
    comment.delete(req.query.id,function (err,student) {
        if (err){
            return res.status(500).send("删除学生信息失败");
        }
        res.redirect('/');
    })
})

//导出router
module.exports = router;


