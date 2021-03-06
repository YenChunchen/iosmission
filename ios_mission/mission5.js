var express = require('express');
var router = express.Router();
var upload=require('./form_data_upload_multer');
var fs=require('fs');
var key;
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
  // if((checkImage(req)===true)&&(checkKey(key,req)===true)){
  //   fail={message:'請上傳對應欄位及檔案'};
  //   res.status(400).json({fail:fail});
  //   return;
  // }
  // if(checkImage(req)===true){
  //   fail={message:'請上傳對應圖檔'};
  //   res.status(400).json({fail:fail});
  //   return;
  // }
  // if(checkKey(key,req)===true){
  //   fail={message:'請填入對應欄位'};
  //   res.status(400).json({fail:fail});
  //   return;
  // }
  if(checkField(key,req,res)!==false){
    success={message:'上傳成功'};
    res.json({success:success});
  }
});

module.exports=router;
/*檢查所有欄位 回應*/
function checkField(key,req,res){
  if((checkImage(req)===true)&&(checkKey(key,req)===true)){
    fail={message:'請上傳對應欄位及檔案'};
    res.status(400).json({fail:fail});
    return false;
  }
  if(checkImage(req)===true){
    fail={message:'請上傳對應圖檔'};
    res.status(400).json({fail:fail});
    return false;
  }
  if(checkKey(key,req)===true){
    fail={message:'請填入對應欄位'};
    res.status(400).json({fail:fail});
    return false;
  }
}


/*檢查輸入欄位*/
function checkKey(key,req){
  var fail;
  for(var i in key){
    if((key[i]===undefined)||(key[i]==='')){
        fail=true;
      }
  }
  if((fail===true)&&(req.file!==undefined)){
    fs.unlink('uploads/'+req.file.filename);
  }
  return fail;
}
/*檢查上傳檔案*/
function checkImage(req){
  var fail;
  if(req.file===undefined){
    fail=true;
  }
  return fail;
}
