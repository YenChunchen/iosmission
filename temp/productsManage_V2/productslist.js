var express = require('express');
var router = express.Router();
var connectdb=require('../routes/connectdb');  //connect to db module
// var fs = require('fs');
var url=require('url');

router.get('/', function(req, res,next) {
  function getallproducts(sqlcmd) {     //顯示全部資料function
    // var cndb = connectdb.con();   //connect to db(db open)
    connectdb.query(sqlcmd, function(err, rows) {
      if (err) {
        console.log("mysql getQuery error");
        return;
      }
      // console.log(rows);
      // cndb.end();    // db close
      res.render('productslist',{rows:rows});
    });
  }
//---------------------------------------------------------------------------
var getpage=url.parse(req.url,true).query;
var rangestr='';
switch (getpage.page){
 case '2':rangestr="10,19";
        break;
 case '3':rangestr="20,29";
        break;
 default:rangestr="0,9";
        break;
}
  getallproducts("SELECT * FROM products limit "+rangestr);
});


//-----------------------------------------------------------------------------
router.post('/', function(req,res) {
  var temp=req.body;   //取得送出的表單
  var delarr=temp.delitem;    //取得勾選的checkbox集合
  console.log(delarr);
  function delproducts(delstr){  //刪除會員資料
    connectdb.query(delstr, function(err) {
      if (err) {
        console.log("mysql getQuery error");
        return;
      }
    });
  }
  var delstr="DELETE  FROM products WHERE id=";
  for(var i in delarr)
  {
  //  console.log(delstr+delarr[i]);
   delproducts(delstr+delarr[i]);
  }
  res.redirect('http://127.0.0.1:3000/productslist');
});


















//-----------------------------------------------------------------------------





module.exports = router;
