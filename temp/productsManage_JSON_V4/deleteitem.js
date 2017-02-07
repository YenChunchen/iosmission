var express = require('express');
var router = express.Router();
var connectdb=require('../routes/connectdb');  //connect to db module
var fs = require('fs');
var url=require('url');
var multer=require('multer');

router.post('/', function(req, res) {
  function delproducts(delstr){  //刪除會員資料
     connectdb.query(delstr, function(err) {
       if (err) {
         console.log("mysql getQuery error");
         return;
       }
     });
   }
  var delitems =req.body.id;
  var delstr="DELETE  FROM products WHERE id=";
  var selstr="SELECT * FROM products WHERE id=";   //暫存每次呼叫選取sql cmd
  function delfiles(delfiles){   //刪除資料夾商品圖
  connectdb.query(delfiles,function(err,rows){
      fs.unlink('productsManage/itemspic/'+rows[0].newpicname);
  });
  }
  for(var i in delitems)
  {
    delfiles(selstr+delitems[i]);
    delproducts(delstr+delitems[i]);
  }
  res.json('delete success');
});

//-----------------------------------------------------------------------------
// router.post('/', function(req,res) {
//   // var temp=req.body;   //取得送出的表單
//   var delarr=req.body.id;    //取得勾選的checkbox集合
//   console.log(delarr);
//   function delproducts(delstr){  //刪除商品資料
//     connectdb.query(delstr, function(err) {
//       if (err) {
//         console.log("mysql getQuery error");
//         return;
//       }
//     });
//   }
//   var delstr="DELETE  FROM products WHERE id=";  //暫存每次呼叫刪除sql cmd
// //-------------------------------------------------------
//   var selstr="SELECT * FROM products WHERE id=";   //暫存每次呼叫選取sql cmd
// function delfiles(delfiles){   //刪除資料夾商品圖
//   connectdb.query(delfiles,function(err,rows){
//       fs.unlink('productsManage/itemspic/'+rows[0].newpicname);
//   });
// }
// //---------------------------------------------------------
// for(var i in delarr)
// {
//  // delfiles(selstr+delarr[i]);
//  // delproducts(delstr+delarr[i]);
// }
// res.json('delete success');
//
//
//   // res.redirect('http://127.0.0.1:3000/productslist');
// });
//
//
//
//
//
// //-----------------------------------------------------------------------------





module.exports = router;
