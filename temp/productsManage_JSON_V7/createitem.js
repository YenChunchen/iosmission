var express = require('express');
var router = express.Router();
var fs = require("fs");
var multer  = require('multer');
var connectdb=require('../routes/connectdb');  //connect to db module
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
var base64str=require('./base64_encode');
//-------------------------------------------------------------------------------
router.post('/',upload.single('itempic')/*上傳單檔*/, function(req, res) {
  var temp=req.body;//暫存req一般欄位物件
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
  var  imgtodb={
    name:temp.name,
    price:parseFloat(temp.price),
    store:parseInt(temp.store),
    oldpicname:'',
    photo:'',
    newpicname:'',
  };
  if (req.file===undefined) { res.json({fail:'未上傳檔案或檔案格式錯誤(jpg png)'});  return;  }
  else  {
    imgtodb.oldpicname=req.file.originalname;
    imgtodb.newpicname=req.file.filename;
  }
  imgtodb.photo=base64str.base64_encode(req.file.filename); //將base64str加入imgtodb物件photo欄位
//---------------------------------------
  var selectstr="SELECT * FROM products";
  var acctemp='';  //沒重複暫存該資料以新增
  additem(imgtodb,selectstr,res);//呼叫getInsert新增資料
});


module.exports=router;

//-----------------------------------------------------------------------
// function base64_encode(file) {   //img 轉 base64 string
//   var bitmap = fs.readFileSync('productsManage/itemspic/'+file);  //存放該路徑檔案
//   var base64str=new Buffer(bitmap).toString('base64');  //轉base64
//   return base64str;
// }
//-----------------------------------------------------------------------
function additem(imgtodb,selstr,response) {
  connectdb.query(selstr, function(err, rows) {  //create newaccount
      if(err){
          console.log(err);
          return ;
      }
      for(var i in rows){
        if(imgtodb.name===rows[i].name)   //判斷帳號是否重複
         {
           response.json({fail:'該商品已存在,請確認'});
           fs.unlink('productsManage/itemspic/'+imgtodb.newpicname);  //如帳號存在不存圖
           return;
         }
         else{
            acctemp=imgtodb.name;
         }
      }
      if(acctemp===imgtodb.name) {
        connectdb.query("INSERT INTO products SET ?",imgtodb);  //沒重複建立
        response.json({success:'create success'});
      }
  });
}
