var connectdb=require('../Controller/connectdb');
var fs=require('fs');

exports.showinfo=function (sqlcmd,res) {     //顯示全部資料function
  connectdb.query(sqlcmd, function(err, rows) {
    if (err) {
      console.log("mysql getQuery error");
      return;
    }
    res.json({member:rows});
  });
};

exports.getUpdate=function (imgtodb,selstr,upstr,res) {  //更新function
  connectdb.query(selstr,function(err,rows) {
   if (err) {
     console.log("mysql getUpdate error");
     return;
   }
   if(rows.length===0) {  //如沒有該會員
     fs.unlink('uploads/'+imgtodb.newpicname);  //移除這次上傳檔案
     res.json({fail:'會員不存在'});
     return;
   }
   fs.unlink('uploads/'+rows[0].newpicname);  //移除前次圖檔
   imgtodb.id=rows[0].id;  //帳號保留前次值
   rows=imgtodb;   //將新資料取代舊資料(除account)
   connectdb.query(upstr,rows,function(err,rows) {
    if (err) {
      console.log("mysql getUpdate error");
      return;
    }
    res.json({success:'會員更新成功'});
   });
  });
};
