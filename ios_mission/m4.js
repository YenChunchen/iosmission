var express=require('express');
var router=express.Router();
var url=require('url');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post('/',upload.single(),function(req,res){
  var temp=req.body;
  console.log(temp);
  var name=temp.name;
  var weatherinput=temp.weatherinput;
  if (name===undefined) res.json({fail:'請輸入name'});
  var message='welcome '+name;
  var today=new Date();
  var time={
    year:today.getFullYear().toString(),
    month:today.getMonth().toString(),
    day:today.getDay().toString(),
    hour:parseInt(today.getHours()),
    min:parseFloat(today.getMinutes())
  };
  switch (weatherinput){
    case 'sunny':{
      weather='http://'+req.hostname+'/uploads/'+temp.weatherinput+'.jpg';
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
