var express = require('express');
var fs = require('fs');
//加载express中的Router方法
var router = express.Router();
router.get('/',function (req,res) {
    fs.readFile('./studentDB.json',function (err,data) {
        if (err){
            return res.status(500).send('数据读取失败');
        };
        //console.log(typeof data);string类型，结果应该转化为object
        //console.log(typeof JSON.parse(data));object
        res.render('./index.html',{
            students:JSON.parse(data).students
        });
    });
});
//导出router
module.exports = router;