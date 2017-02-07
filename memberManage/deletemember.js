var express = require('express');
var router = express.Router();
var fs = require("fs");

//-----------------------------------------------------
var url = require('url');
router.delete('/', function(req, res) {
  delfile(req,res);
  delmember(req,res);
});

module.exports=router;

var connectdb=require('./connectdb');  //connect to db module
function delmember(req,res){  //刪除會員資料
  var getquery = url.parse(req.url, true).query;
  connectdb.query("DELETE  FROM membertable WHERE id=?",getquery.id, function(err) {
    if (err) {
      res.json(error);
      return;
    }
    else res.json({success:"會員刪除成功"});
  });
}
 function delfile(req,res){   //刪除會員圖檔
   var getquery = url.parse(req.url, true).query;
   connectdb.query("SELECT * FROM membertable WHERE id=?",getquery.id, function(err,rows) {
     if (err) {
       res.json({err:err});
       return;
     }
     if(rows.length===0) {
       res.json({fail:"該會員不存在"});
       return;
     }
     else{
       fs.unlink('uploads/'+rows[0].newpicname);
     }
   });
 }
