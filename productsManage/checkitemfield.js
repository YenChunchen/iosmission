var fs=require('fs');
exports.checkitemfield=function(temp,req,res) {   //img 轉 base64 string
  if(temp.name==='') {
    res.json(200,{fail:'請輸入商品名稱'});
    fs.unlink('productsManage/itemspic/'+req.file.filename);
    return;
  }
  if(temp.price==='')  {
    res.json(200,{fail:'請輸入商品價格'});
    fs.unlink('productsManage/itemspic/'+req.file.filename);
    return;
  }
  if(temp.store==='')  {
    res.json(200,{fail:'請輸入商品存量'});
    fs.unlink('productsManage/itemspic/'+req.file.filename);
    return;
   }
};
