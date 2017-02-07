var connectdb=require('../Controller/connectdb');
exports.getInsert=function (imgtodb,selstr,res) {
  connectdb.query(selstr, function(err, rows) {  //create newaccount
      if(err){
          res.json(err);
          return ;
        }
      for(var i in rows){
      if(imgtodb.account===rows[i].account)   //判斷帳號是否重複
       {
         res.json({fail:'該會員已存在'});
         fs.unlink('uploads/'+imgtodb.newpicname);  //如帳號存在不存圖
         return;
       }
       else{
          acctemp=imgtodb.account;
       }
    }
    if(acctemp===imgtodb.account) {
      res.json({success:'create success'});
      connectdb.query("INSERT INTO membertable SET ?",imgtodb);  //沒重複建立
    }
  });
};
