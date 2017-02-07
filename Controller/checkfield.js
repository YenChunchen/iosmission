var fs = require("fs");

exports.checkitemfield=function(temp,res,req){
  if(temp.name==='') {
    fs.unlink('productsManage/itemspic/'+req.file.filename);
    res.json({fail:'請輸入商品名稱'});
    return;
  }
  if(temp.price==='')  {
    fs.unlink('productsManage/itemspic/'+req.file.filename);
    res.json({fail:'請輸入商品價格'});
    return;
  }
  if(temp.store==='')  {
    fs.unlink('productsManage/itemspic/'+req.file.filename);
    res.json({fail:'請輸入商品存量'});
    return;
   }
};

//------------------------------------------------------------------------
exports.checkmemberfield=function(temp,res,req){
  if(temp.account==='') {
    fs.unlink('uploads/'+req.file.filename);
    res.json({fail:'請輸入帳號'});
    return;
  }
  if(temp.pwd==='')  {
    fs.unlink('uploads/'+req.file.filename);
    res.json({fail:'請輸入密碼'});
    return;
  }
};
