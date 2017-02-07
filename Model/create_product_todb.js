var connectdb=require('../memberManage/connectdb');  //connect to db module
var fs = require("fs");
exports.additem=function (imgtodb,selstr,response) {
  connectdb.query(selstr, function(err, rows) {  //create newaccount
      if(err){
          console.log(err);
          return ;
      }
      for(var i in rows){
        if(imgtodb.name===rows[i].name)   //判斷帳號是否重複
         {
           response.json({fail:'該商品已存在,請確認'});
           fs.unlink('productsManage/itemspic/'+imgtodb.newpicname);  //如帳號存在不存圖
           return;
         }
         else{
            acctemp=imgtodb.name;
         }
      }
      if(acctemp===imgtodb.name) {
        connectdb.query("INSERT INTO products SET ?",imgtodb);  //沒重複建立
        response.json({success:'商品創建成功'});
      }
  });
};
