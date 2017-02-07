var express = require('express');
var router = express.Router();
var fs = require('fs');
var url=require('url');
var showproduct_todb=require('../Model/showproduct_todb');
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
  showproduct_todb.getallproducts("SELECT * FROM products limit "+rangestr,res);
});

module.exports = router;
