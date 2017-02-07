var express = require('express');
var router = express.Router();

var url = require('url');
var connectdb=require('../memberManage/connectdb');  //connect to db module
router.get('/', function(req, res, next) {
  var getquery = url.parse(req.url, true).query;
  function showinfo(sqlcmd) {     //顯示全部資料function
    connectdb.query(sqlcmd, function(err, rows) {
      if (err) {
        res.json({error:err});
        return;
      }
      if(rows.length!==0) res.json({item:rows});
      else res.json({fail:'無該項商品'});
    });
  }
  var selectstr="SELECT * FROM products WHERE id="+getquery.id;
  showinfo(selectstr);
});
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
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
        cb(null, false);
      }
  },
});
//-----------------------------------------------------
var base64str=require('./base64_encode');
var imgtodb;
router.put('/',upload.single('itempic')/*上傳單檔*/, function(req, res) {
  var temp=req.body;//暫存req一般欄位物件
  var getquery = url.parse(req.url, true).query;
  var thisid=getquery.id;
  if(temp.name==='') {
    res.json({fail:'請輸入商品名稱'});
    fs.unlink('productsManage/itemspic/'+req.file.filename);
    return;
  }
  if(temp.price==='')  {
    res.json({fail:'請輸入商品價格'});
    fs.unlink('productsManage/itemspic/'+req.file.filename);
    return;
  }
  if(temp.store==='')  {
    res.json({fail:'請輸入商品存量'});
    fs.unlink('productsManage/itemspic/'+req.file.filename);
    return;
   }
  imgtodb={
    id:thisid,
    name:temp.name,
    price:parseFloat(temp.price),
    store:parseInt(temp.store),
    oldpicname:'',
    photo:'',
    newpicname:'',
  };
  var newitem;
 if (req.file===undefined) { res.json('未上傳檔案或檔案格式錯誤(jpg png)');  return;  }
 else  {
   imgtodb.oldpicname=req.file.originalname;
   imgtodb.newpicname=req.file.filename;
 }
 imgtodb.photo=base64str.base64_encode(req.file.filename); //將base64str加入imgtodb物件photo欄位
//---------------------------------------
var selectstr='SELECT * FROM products WHERE id='+thisid;
var updatestr='UPDATE products SET ? WHERE id='+thisid;
rmoldpic(selectstr,res);
edititem(imgtodb,updatestr,res);//呼叫edititem更新商品資料
});

module.exports=router;






//-------------------------------------------------------------
// function base64_encode(file) {   //img 轉 base64 string
//   var bitmap = fs.readFileSync('productsManage/itemspic/'+file);  //存放該路徑檔案
//   var base64str=new Buffer(bitmap).toString('base64');  //轉base64
//   return base64str;
// }
//-------------------------------------------------------------
function rmoldpic(selectstr,response){
  connectdb.query(selectstr,function(err,rows) {
   if (err) {
     response.json({fail:err});
     return;
   }
   if(rows.length===0)
    { response.json({fail:'無該項品'}); return; }
   else
    fs.unlink('./productsManage/itemspic/'+rows[0].newpicname);  //移除前次圖檔
   });
}
//-------------------------------------------------------------
function edititem(imgtodb,upstr,response) {  //更新function
   connectdb.query(upstr,imgtodb,function(err) {
    if (err) {
      response.json({fail:err});
      return;
    }
    else response.json({success:'update success'});
   });
}
