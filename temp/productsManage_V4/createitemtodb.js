var connectdb=require('../routes/connectdb');  //connect to db module
var fs = require("fs");
var acctemp='';  //沒重複暫存該資料以新增
exports.additem=function additem(imgtodb,selstr) {
  // var cndb = connectdb.con();   //connect to db(db open)
  connectdb.query(selstr, function(err, rows) {  //create newaccount
      if(err){
          console.log(err);
          return ;
      }
      for(var i in rows){
        if(imgtodb.name===rows[i].name)   //判斷帳號是否重複
         {
           console.log('該商品已存在,請確認');
           fs.unlink('productsManage/itemspic/'+imgtodb.newpicname);  //如帳號存在不存圖
          //  cndb.end();
           return;
         }
         else{
            acctemp=imgtodb.name;
         }
      }
      // console.log(acctemp);
      // console.log(imgtodb);
      if(acctemp===imgtodb.name) {
        console.log('create success');
        connectdb.query("INSERT INTO products SET ?",imgtodb);  //沒重複建立
        // cndb.end();
      }
      // console.log(acctemp);
  });
};
