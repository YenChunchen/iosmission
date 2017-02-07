var connectdb=require('./connectdb');  //連結至db模塊
var fs = require("fs");
var acctemp='';  //沒重複暫存該資料以新增
exports.getInsert=function getInsert(imgtodb,selstr) {
  var cndb = connectdb.con();   //connect to db(db open)
  cndb.query(selstr, function(err, rows) {  //create newaccount
      if(err){
          console.log(err);
          return ;
      }
      for(var i in rows){
        if(imgtodb.account===rows[i].account)   //判斷帳號是否重複
         {
           console.log('該會員已存在');
           fs.unlink('uploads/'+imgtodb.newpicname);  //如帳號存在不存圖
           cndb.end();
           return;
         }
         else{
            acctemp=imgtodb.account;
         }
      }
      // console.log(acctemp);
      // console.log(imgtodb);
      if(acctemp===imgtodb.account) {
        console.log('create success');
        cndb.query("INSERT INTO membertable SET ?",imgtodb);  //沒重複建立
        cndb.end();
      }
      // console.log(acctemp);
  });
};
