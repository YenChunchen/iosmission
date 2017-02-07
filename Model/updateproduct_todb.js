var connectdb=require('../memberManage/connectdb');  //connect to db module
var fs = require("fs");
exports.showinfo=function (sqlcmd,res) {     //顯示全部資料function
  connectdb.query(sqlcmd, function(err, rows) {
    if (err) {
      res.json({error:err});
      return;
    }
    if(rows.length!==0)
      res.json({item:rows});
    else
      res.json({fail:'無該項商品'});
  });
};
//-------------------------------------------------------------------------------
exports.rmoldpic=function (selectstr,response){
  connectdb.query(selectstr,function(err,rows) {
   if (err) {
     response.json({fail:err});
     return;
   }
   if(rows.length===0)
    { response.json({fail:'無該項品'}); return; }
   else
    fs.unlink('./productsManage/itemspic/'+rows[0].newpicname);  //移除前次圖檔
   });
};
//-------------------------------------------------------------
exports.edititem=function (imgtodb,upstr,response) {  //更新function
   connectdb.query(upstr,imgtodb,function(err) {
    if (err) {
      response.json({fail:err});
      return;
    }
    else response.json({success:'update success'});
   });
};
