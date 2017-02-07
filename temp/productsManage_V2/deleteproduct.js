var express = require('express');
var router = express.Router();

var fs = require("fs");
var multer=require('multer');

//-----------------------------------------------------

var url = require('url');
var connectdb=require('../routes/connectdb');  //connect to db module
var url = require('url');
router.post('/', function(req, res) {
  // var getquery = url.parse(req.url, true).query;
   function delproducts(delstr){  //刪除會員資料
     connectdb.query(delstr, function(err) {
       if (err) {
         console.log("mysql getQuery error");
         return;
       }
     });
   }
   var t =req.body.txt;
   console.log(t);
  var delitems =req.body.id;
  // console.log(typeof delitems[1]);
  var delstr="DELETE  FROM products WHERE id=";
  for(var i in delitems)
  {
    // console.log(delstr+delitems[i]);
    delproducts(delstr+delitems[i]);
  }
  res.json(delitems);
 //  function delmember(){  //刪除會員資料
 //    connectdb.query("DELETE  FROM membertableroductsp WHERE id=?",getquery.id, function(err) {
 //      if (err) {
 //        console.log("mysql getQuery error");
 //        return;
 //      }
 //    });
 //  }
 //   function delfile(){   //刪除會員圖檔
 //     connectdb.query("SELECT * FROM membertable WHERE id=?",getquery.id, function(err,rows) {
 //       if (err) {
 //         console.log("mysql getQuery error");
 //         return;
 //       }
 //       console.log(rows[0].newpicname);
 //       fs.unlink('uploads/'+rows[0].newpicname);
 //     });
 //   }
 // delfile();
 // delmember();
 // res.redirect('http://127.0.0.1:3000/showall');
});



//-----------------------------------------------------------------------------------

router.get('/', function(req, res, next) {
  var allurlquery =url.parse(req.url).query;  //url所有參數值(包括欄位)
  var getaccount = url.parse(req.url, true).query;
  console.log('1111');
  // console.log('URL account參數值：',getaccount.account);
  function showinfo(sqlcmd) {     //顯示全部資料function


  }
});
















module.exports=router;
