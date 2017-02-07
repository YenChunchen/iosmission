var express = require('express');
var router = express.Router();
var connectdb=require('../memberManage/connectdb');  //connect to db module
var fs = require('fs');
var url=require('url');
var multer=require('multer');

router.delete('/', function(req, res) {
  var delitems =req.body.id;
  var delstr="DELETE  FROM products WHERE id=";
  var selstr="SELECT * FROM products WHERE id=";   //暫存每次呼叫選取sql cmd
  for(var i in delitems)
  {
    delfiles(selstr+delitems[i],res);
    delproducts(delstr+delitems[i],res);
  }
});

module.exports = router;

//------------------------------------------------------------------------------
function delfiles(delfiles,response){   //刪除資料夾商品圖
  connectdb.query(delfiles,function(err,rows){
    if(rows.length===0) { response.json({fail:'商品不存在'}); return ; }
    fs.unlink('productsManage/itemspic/'+rows[0].newpicname);
  });
}

//------------------------------------------------------------------------------
function delproducts(delstr,response){  //刪除會員資料
   connectdb.query(delstr, function(err) {
     if (err) {
       console.log("mysql getQuery error");
       return;
     }
     else response.json({success:'商品刪除成功'});
   });
 }
