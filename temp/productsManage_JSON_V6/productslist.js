var express = require('express');
var router = express.Router();
var connectdb=require('../routes/connectdb');  //connect to db module
var fs = require('fs');
var url=require('url');

router.get('/', function(req, res,next) {
  var getpage=url.parse(req.url,true).query;
  var rangestr='';
      var current=parseInt(getpage.page);
      var x,y; //x為該頁第一筆,y為該頁最末筆
      if(getpage.page===undefined)
      {x=0;y=20;}
      else{
        if(getpage.page==='NaN'){   //如果沒有page uri querystring
          x=0;  //則顯示第一頁
          y=20;
        }
        else{
          x=(current-1)*20;   //page: 1  2   3
          y=(current*20);   //   x: 0  20  40
        }                     //   y: 19 39  59
      }
  rangestr=x+","+y;
  getallproducts("SELECT * FROM products limit "+rangestr,res);
});

module.exports = router;

//------------------------------------------------------------------------------
function getallproducts(sqlcmd,response) {     //顯示全部資料function
  connectdb.query(sqlcmd, function(err, rows) {
    if (err) {
      console.log("mysql getQuery error");
      return;
    }
    response.json({rows:rows});
  });
}
