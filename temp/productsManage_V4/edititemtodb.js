var connectdb=require('../routes/connectdb');  //連結至db模塊
var fs = require("fs");

exports.edititem=function edititem(imgtodb,selstr,upstr) {  //更新function
  // var cndb = connectdb.con();   //connect to db(db open)
  connectdb.query(selstr,function(err,rows) {
   if (err) {
     console.log("mysql getUpdate error");
     return;
   }
   if(rows.length===0) {  //如沒有該會員
     fs.unlink('productsManage/itemspic/'+imgtodb.newpicname);  //移除這次上傳檔案
     console.log('該商品不存在');
     return;
   }
   console.log(rows[0]);
   fs.unlink('productsManage/itemspic/'+rows[0].newpicname);  //移除前次圖檔
   rows=imgtodb;   //將新資料取代舊資料(除account)
   console.log('更新後新資料',rows);  //更新后
   connectdb.query(upstr,rows,function(err,rows) {
    if (err) {
      console.log("mysql getUpdate error");
      return;
    }
   });
  });
};
