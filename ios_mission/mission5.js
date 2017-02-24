var express = require('express');
var router = express.Router();
var upload=require('./form_data_upload_multer');
var fs=require('fs');
var key;
/*新建會員*/
router.post('/',upload.single('mission5Image')/*上傳單檔*/,function(req,res) {
  var fail,success;
  var temp=req.body;//暫存req一般欄位物件
  key={
    key1:temp.key1,
    key2:temp.key2,
    key3:temp.key3,
    key4:temp.key4,
    key5:temp.key5,
    key6:temp.key6
  };
  if(req.file===undefined){
    fail={message:'請上傳正確格式圖檔'};
    res.status(400).json({fail:fail});
    return;
  }
  if(checkField(key)===true) {
    fs.unlink('uploads/'+req.file.filename);
    fail={message:'upload fail'};
    res.status(400).json({fail:fail});
    return;
  }
  else{
    success={message:'upload success'};
    res.json({success:success});
  }
});

module.exports=router;

function checkField(key){
  var fail;
  for(var i in key){
    if((key[i]===undefined)||(key[i]==='')){
        fail=true;
      }
  }
  return fail;
}
