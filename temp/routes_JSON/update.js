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
  function showinfo(sqlcmd) {     //顯示全部資料function
    connectdb.query(sqlcmd, function(err, rows) {
      if (err) {
        console.log("mysql getQuery error");
        return;
      }

      res.render('update',{rows:rows});
    });
  }
  var selectstr="SELECT * FROM membertable WHERE account='"+getaccount.account+"'";
  showinfo(selectstr);
});
//-------------------------------------------------------------------------------
var imgtodb={};
router.post('/',upload.single('file')/*上傳單檔*/, function(req, res) {
  var temp=req.body;//暫存req一般欄位物件
    imgtodb={
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
 if(imgtodb.pwd==='') {  res.json('請輸入密碼');   return;  }
  function base64_encode(file) {   //img 轉 base64 string
    var bitmap = fs.readFileSync('uploads/'+file);  //存放該路徑檔案
    var base64str=new Buffer(bitmap).toString('base64');  //轉base64
    imgtodb.photo=base64str; //將base64str加入imgtodb物件photo欄位
  }
  base64_encode(req.file.filename);
//---------------------------------------
var editaccount=require('./editaccount');  //連結至editaccount.js模塊
var connectdb=require('./connectdb');  //連結至db模塊

//---------------------------------------------------
var findupdateaccount="'"+temp.account+"'";  //查詢欲更新的該筆帳號
var selectstr='SELECT * FROM membertable WHERE account='+findupdateaccount;
var updatestr='UPDATE membertable SET ? WHERE account='+findupdateaccount;

function getUpdate(imgtodb,selstr,upstr) {  //更新function
  // var cndb = connectdb.con();   //connect to db(db open)
  connectdb.query(selstr,function(err,rows) {
   if (err) {
     console.log("mysql getUpdate error");
     return;
   }
   if(rows.length===0) {  //如沒有該會員
     fs.unlink('uploads/'+imgtodb.newpicname);  //移除這次上傳檔案
     res.json('會員不存在');
     return;
   }
  //  console.log('更新前舊資料',rows);  //更新前(rows舊資料)
   fs.unlink('uploads/'+rows[0].newpicname);  //移除前次圖檔
   imgtodb.account=rows[0].account;  //帳號保留前次值
   rows=imgtodb;   //將新資料取代舊資料(除account)
  //  console.log('更新後新資料',rows);  //更新后
   connectdb.query(upstr,rows,function(err,rows) {
    if (err) {
      console.log("mysql getUpdate error");
      return;
    }
    res.json('update success');
   });
  });
}



getUpdate(imgtodb,selectstr,updatestr);//呼叫getUpdate更新資料
//-----------------------------------------
// res.redirect('http://127.0.0.1:3000/showall');
});



module.exports=router;
