var express = require('express');
var router = express.Router();

var fs = require("fs");

var multer  = require('multer');
var storage = multer.diskStorage({  //檔案儲存
  destination: function (req, file, cb) {  //檔案位置
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {    //檔案名稱
    var extname; //暫存副檔名
    if(file.mimetype === 'image/jpeg') extname='.jpeg';  //判斷型態添加副檔名
    if(file.mimetype === 'image/png') extname='.png';
    cb(null, file.fieldname + '-' + Date.now()+extname);
  }
});
var upload = multer({
  storage: storage,   //上傳檔案儲存
  fileFilter: function (req, file, cb) {  //上傳檔案條件
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
       cb(null, true);
      }
      else {
        cb(null, false);
      }
  },
});

//-------------------------------------------------------------------------------
var base64str=require('./base64_encode');
var imgtodb;
router.post('/',upload.single('file')/*上傳單檔*/, function(req, res) {
  var temp=req.body;//暫存req一般欄位物件
  if(temp.account==='') {
    res.json({fail:'請輸入帳號'});
    fs.unlink('uploads/'+req.file.filename);
    return;
  }
  if(temp.pwd==='')  {
    res.json({fail:'請輸入密碼'});
    fs.unlink('uploads/'+req.file.filename);
    return;
  }
  imgtodb={
    account:temp.account,
    pwd:temp.pwd,
    oldpicname:'',
    photo:'',
    newpicname:'',
  };
  if (req.file===undefined) { res.json({fail:'未上傳檔案或檔案格式錯誤(jpg png)'});  return; }
  else  {
    imgtodb.oldpicname=req.file.originalname;
    imgtodb.newpicname=req.file.filename;
  }
    imgtodb.photo=base64str.base64_encode(req.file.filename); //將base64str加入imgtodb物件photo欄位
//---------------------------------------
  var selectstr="SELECT * FROM membertable";
  var acctemp='';  //沒重複暫存該資料以新增
  getInsert(imgtodb,selectstr,res);//呼叫getInsert新增資料
});


module.exports=router;
//-------------------------------------------------------------------------------
var connectdb=require('./connectdb');
function getInsert(imgtodb,selstr,res) {
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
        //  cndb.end();
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
}
