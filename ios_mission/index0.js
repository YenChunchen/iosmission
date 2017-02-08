var express=require('express');
var router=express.Router();
var url=require('url');
var fs=require('fs');
router.get('/',function(req,res){
  var getquery = url.parse(req.url, true).query;
  var weatherinput=req.headers.weatherinput;  //顯示header中父項目內容
  var name=getquery.name;
  if (name===undefined) res.json({fail:'請輸入name'});
  var message='welcome '+name;
  var today=new Date();
  var weather;
  var time={
    year:today.getFullYear().toString(),
    month:today.getMonth().toString(),
    day:today.getDay().toString(),
    hour:parseInt(today.getHours()),
    min:parseFloat(today.getMinutes())
  };
  switch (weatherinput){
    case 'sunny':{
      weather='http://'+req.hostname+'/uploads/sunny.jpg';
      break;
    }
    case 'rainy':{
      weather='http://'+req.hostname+'/uploads/rainy.jpg';
      break;
    }
    case 'snow':{
      weather='http://'+req.hostname+'/uploads/snow.jpg';
      break;
    }
    case 'fog':{
      weather='http://'+req.hostname+'/uploads/fog.jpg';
      break;
    }
    default:{
      weather='http://'+req.hostname+'/uploads/nothing.jpg';
      break;
    }
  }
  res.json({welcome:message,time:time,weather:weather});
});

module.exports=router;
