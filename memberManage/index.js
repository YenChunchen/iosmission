var express=require('express');
var router=express.Router();
var url=require('url');
router.get('/',function(req,res){
  // { host: '127.0.0.1:3000',
  // connection: 'keep-alive',
  // 'cache-control': 'no-cache',
  // 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
  // 'postman-token': '4f7554e1-f270-9827-229f-e9fd6a29baa3',
  // accept: '*/*',
  // 'accept-encoding': 'gzip, deflate, sdch, br',
  // 'accept-language': 'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4' }
  // var headerinfoL= req.headers['accept-encoding'];  //顯示header中子項目內容
  // var headerinfoM=req.headers.connection;  //顯示header中父項目內容
  // console.log(headerinfoL);
  // console.log(headerinfoM);
  var getquery = url.parse(req.url, true).query;
  var name=getquery.name;
  var message='welcome '+name;
  var today=new Date();
  var time={
    year:today.getFullYear(),
    month:today.getMonth(),
    day:today.getDay(),
    hour:today.getHours(),
    min:parseFloat(today.getMinutes())
  };
  res.json({welcome:message,time:time});
});

module.exports=router;
