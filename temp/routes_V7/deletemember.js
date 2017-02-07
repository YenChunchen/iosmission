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
       console.log(file);
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
router.post('/', function(req, res, next) {
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
      fs.unlink(fs.unlink('uploads/'+rows[0].newpicname));
      // console.log(rows[0].account);
      cndb.end();    // db close
      console.log(rows);
      res.render('showall');
    });
  }
  var selectstr="DELETE * FROM membertable WHERE account='"+getaccount.account+"'";
  showinfo(selectstr);
  // res.end();
});
