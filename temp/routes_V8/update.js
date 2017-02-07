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
        console.log('檔案格式不符');
        cb(null, false);
      }
  },
});

//-----------------------------------------------------
var url = require('url');
var connectdb=require('./connectdb');  //connect to db module
router.get('/', function(req, res, next) {
  var allurlquery =url.parse(req.url).query;  //url所有參數值(包括欄位)
  var getaccount = url.parse(req.url, true).query;
  // console.log('URL account參數值：',getaccount.account);
  function showinfo(sqlcmd) {     //顯示全部資料function
    var cndb = connectdb.con();   //connect to db(db open)
    cndb.query(sqlcmd, function(err, rows) {
      if (err) {
        console.log("mysql getQuery error");
        return;
      }
      // console.log(rows[0].account);
      cndb.end();    // db close
      // console.log(rows);
      res.render('update',{rows:rows});
    });
  }
  var selectstr="SELECT * FROM membertable WHERE account='"+getaccount.account+"'";
  showinfo(selectstr);
  // res.end();
});
//-------------------------------------------------------------------------------
var imgtodb={};
router.post('/',upload.single('file')/*上傳單檔*/, function(req, res) {
  var temp=req.body;//暫存req一般欄位物件
    imgtodb={
    account:temp.account,
    pwd:temp.pwd,
    // oldpicname:req.file.originalname,
    oldpicname:'',
    photo:'',
    // newpicname:req.file.filename,
    newpicname:'',
  };
 if (req.file===undefined) { res.end('未上傳檔案或檔案格式錯誤(jpg png)');  return;  }
 else  {
   imgtodb.oldpicname=req.file.originalname;
   imgtodb.newpicname=req.file.filename;
 }
 if(imgtodb.pwd==='') {  res.end('請輸入密碼');   return;  }
  // console.log(temp);
  function base64_encode(file) {   //img 轉 base64 string
    var bitmap = fs.readFileSync('uploads/'+file);  //存放該路徑檔案
    var base64str=new Buffer(bitmap).toString('base64');  //轉base64
  // console.log(base64str);
    imgtodb.photo=base64str; //將base64str加入imgtodb物件photo欄位
  }
  base64_encode(req.file.filename);
  // console.log(imgtodb);
//---------------------------------------
var editaccount=require('./editaccount');  //連結至editaccount.js模塊
//---------------------------------------------------
var findupdateaccount="'"+temp.account+"'";  //查詢欲更新的該筆帳號
// console.log('====',imgtodb);
var selectstr='SELECT * FROM membertable WHERE account='+findupdateaccount;
var updatestr='UPDATE membertable SET ? WHERE account='+findupdateaccount;
var getUpdate=editaccount.getUpdate(imgtodb,selectstr,updatestr);//呼叫getUpdate更新資料
//-----------------------------------------
res.redirect('http://127.0.0.1:3000/showall');
// res.end();
});



module.exports=router;
