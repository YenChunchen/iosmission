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

//-----------------------------------------------------
var url = require('url');
var updatemember_todb=require('../Model/updatemember_todb');
router.get('/', function(req, res, next) {
  var allurlquery =url.parse(req.url).query;  //url所有參數值(包括欄位)
  var getquery = url.parse(req.url, true).query;
  var selectstr="SELECT * FROM membertable WHERE id="+getquery.id;
  updatemember_todb.showinfo(selectstr,res);
});
//-------------------------------------------------------------------------------
var base64str=require('./base64_encode_member');
var checkmemberfield=require('./checkfield');
var imgtodb;
router.put('/',upload.single('file')/*上傳單檔*/, function(req, res) {
    var temp=req.body;//暫存req一般欄位物件
    // if(temp.account==='') {
    //   res.json({fail:'請輸入帳號'});
    //   fs.unlink('uploads/'+req.file.filename);
    //   return;
    // }
    // if(temp.pwd==='')  {
    //   res.json({fail:'請輸入密碼'});
    //   fs.unlink('uploads/'+req.file.filename);
    //   return;
    // }
    checkmemberfield.checkmemberfield(temp,res,req);
    var getquery = url.parse(req.url, true).query;
    var thisid=getquery.id;
    imgtodb={
      id:thisid,
      account:temp.account,
      pwd:temp.pwd,
      oldpicname:'',
      photo:'',
      newpicname:'',
    };
    if (req.file===undefined) { res.json('未上傳檔案或檔案格式錯誤(jpg png)');  return;  }
    else  {
      imgtodb.oldpicname=req.file.originalname;
      imgtodb.newpicname=req.file.filename;
    }
    imgtodb.photo=base64str.base64_encode(req.file.filename); //將base64str加入imgtodb物件photo欄位
//---------------------------------------------------
    var selectstr='SELECT * FROM membertable WHERE id='+thisid;
    var updatestr='UPDATE membertable SET ? WHERE id='+thisid;
    updatemember_todb.getUpdate(imgtodb,selectstr,updatestr,res);//呼叫getUpdate更新資料
});
module.exports=router;
