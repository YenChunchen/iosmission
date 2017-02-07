var connectdb=require('./connectdb');  //連結至db模塊
var fs = require("fs");

exports.getUpdate=function getUpdate(imgtodb,selstr,upstr) {  //更新function
  var cndb = connectdb.con();   //connect to db(db open)
  cndb.query(selstr,function(err,rows) {
   if (err) {
     console.log("mysql getUpdate error");
     return;
   }
   if(rows.length===0) {  //如沒有該會員
     fs.unlink('uploads/'+imgtodb.newpicname);  //移除這次上傳檔案
     console.log('會員不存在');
     return;
   }
  //  console.log('更新前舊資料',rows);  //更新前(rows舊資料)
   fs.unlink('uploads/'+rows[0].newpicname);  //移除前次圖檔
   imgtodb.account=rows[0].account;  //帳號保留前次值
   rows=imgtodb;   //將新資料取代舊資料(除account)
  //  console.log('更新後新資料',rows);  //更新后
   cndb.query(upstr,rows,function(err,rows) {
    if (err) {
      console.log("mysql getUpdate error");
      return;
    }
   });
  });
};
