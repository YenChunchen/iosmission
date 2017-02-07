var connectdb=require('../memberManage/connectdb');  //connect to db module
var fs = require('fs');

//------------------------------------------------------------------------------
exports.delfiles=function (delfiles,res){   //刪除資料夾商品圖
  connectdb.query(delfiles,function(err,rows){
    if(rows.length===0) {
      res.json({fail:'商品不存在'});
      return ;
    }
    fs.unlink('productsManage/itemspic/'+rows[0].newpicname);
  });
};
//------------------------------------------------------------------------------
exports.delproducts=function (delstr,res){  //刪除會員資料
  connectdb.query(delstr, function(err) {
    if (err) {
      console.log("mysql getQuery error");
      return;
    }
    else res.json({success:'商品刪除成功'});
  });
 };


// function delproducts(delstr,res){  //刪除會員資料
//    connectdb.query(delstr, function(err) {
//      if (err) {
//        console.log("mysql getQuery error");
//        return;
//      }
//      else res.json({success:'商品刪除成功'});
//    });
//   }
