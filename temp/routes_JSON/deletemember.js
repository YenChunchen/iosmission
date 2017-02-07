var express = require('express');
var router = express.Router();

var fs = require("fs");

//-----------------------------------------------------
var url = require('url');
var connectdb=require('./connectdb');  //connect to db module
var url = require('url');
router.get('/', function(req, res) {
  var getquery = url.parse(req.url, true).query;
  console.log(getquery.id);
  function delmember(){  //刪除會員資料
    connectdb.query("DELETE  FROM membertable WHERE id=?",getquery.id, function(err) {
      if (err) {
        res.json(error);
        return;
      }
      else res.json("delete success");
    });
  }
   function delfile(){   //刪除會員圖檔
     connectdb.query("SELECT * FROM membertable WHERE id=?",getquery.id, function(err,rows) {
       if (err) {
         console.log("mysql getQuery error");
         return;
       }
       if(rows.length===0) res.json("該會員不存在");
       console.log(rows[0].newpicname);
       fs.unlink('uploads/'+rows[0].newpicname);
     });
   }
 delfile();
 delmember();
 // res.redirect('http://127.0.0.1:3000/showall');
});

module.exports=router;
