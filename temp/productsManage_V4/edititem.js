var express = require('express');
var router = express.Router();

var fs = require("fs");

var multer  = require('multer');
var storage = multer.diskStorage({  //檔案儲存
  destination: function (req, file, cb) {  //檔案位置
    cb(null, 'productsManage/itemspic');
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
var connectdb=require('../routes/connectdb');  //connect to db module
router.get('/', function(req, res, next) {
  var getquery = url.parse(req.url, true).query;
  // console.log('URL account參數值：',getaccount.account);
  function showinfo(sqlcmd) {     //顯示全部資料function
    // var cndb = connectdb.con();   //connect to db(db open)
    connectdb.query(sqlcmd, function(err, rows) {
      if (err) {
        console.log("mysql getQuery error");
        return;
      }
      res.render('updateitem',{rows:rows});
    });
  }
  var selectstr="SELECT * FROM products WHERE id="+getquery.id;
  showinfo(selectstr);
  // res.end();
});
//-------------------------------------------------------------------------------
var imgtodb={};
router.post('/',upload.single('itempic')/*上傳單檔*/, function(req, res) {
  var temp=req.body;//暫存req一般欄位物件
  var  imgtodb={
    id:parseInt(temp.id),
    name:temp.name,
    price:parseFloat(temp.price),
    store:parseInt(temp.store),
    oldpicname:'',
    photo:'',
    newpicname:'',
  };
 if (req.file===undefined) { res.end('未上傳檔案或檔案格式錯誤(jpg png)');  return;  }
 else  {
   imgtodb.oldpicname=req.file.originalname;
   imgtodb.newpicname=req.file.filename;
 }
 if(imgtodb.name==='') {res.end('請輸入商品名稱'); return;}
 if(imgtodb.price==='')  { res.end('請輸入商品價格');  return;  }
 if(imgtodb.store==='')  { res.end('請輸入商品存量');  return;  }
  // console.log(temp);
  function base64_encode(file) {   //img 轉 base64 string
    var bitmap = fs.readFileSync('productsManage/itemspic/'+file);  //存放該路徑檔案
    var base64str=new Buffer(bitmap).toString('base64');  //轉base64
  // console.log(base64str);
    imgtodb.photo=base64str; //將base64str加入imgtodb物件photo欄位
  }
  base64_encode(req.file.filename);
  // console.log(imgtodb);
//---------------------------------------
var edititemtodb=require('./edititemtodb');  //連結至edititemtodb.js模塊
//---------------------------------------------------
var findupdateid=String(imgtodb.id);  //查詢欲更新的該筆商品id
console.log(typeof findupdateid);
// console.log('====',imgtodb);
var selectstr='SELECT * FROM products WHERE id='+findupdateid;
console.log(selectstr);
var updatestr='UPDATE products SET ? WHERE id='+findupdateid;
var edititem=edititemtodb.edititem(imgtodb,selectstr,updatestr);//呼叫edititem更新商品資料
// //-----------------------------------------
res.redirect('http://127.0.0.1:3000/productslist');
// res.end();
});

module.exports=router;
