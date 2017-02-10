var express=require('express');
var router=express.Router();
var url=require('url');
var today=new Date();
var time={
  year:today.getFullYear().toString(),
  month:today.getMonth().toString(),
  day:today.getDay().toString(),
  hour:parseInt(today.getHours()),
  min:parseFloat(today.getMinutes())
};
var weather;
router.get('/m1',function(req,res){
  var name=req.query.name;
  if ((name===undefined)||(name==='')) res.json({fail:'請輸入name'});
  var message='welcome '+name;
  res.json({welcome:message,time:time});
});
//-----------------------------------------------------------------------
router.get('/m2',function(req,res){
  var weatherinput=req.headers.weatherinput;
  var name=req.headers.name;
  checkfield(name,weatherinput,res);
  var message='welcome '+name;
  chooseweather(weatherinput,req,res);
<<<<<<< HEAD
=======
=======
>>>>>>> 29c626cfc281b98e0a463eed60a0e03c24017ad6
  var today=new Date();
  var weather;
  var time={
    year:today.getFullYear().toString(),
    month:today.getMonth().toString(),
    day:today.getDay().toString(),
    hour:parseInt(today.getHours()),
    min:parseFloat(today.getMinutes())+0.5
  };
  switch (weatherinput){
    case 'sunny':{
      weather='https://'+req.hostname+'/uploads/sunny.jpg';
      break;
    }
    case 'rainy':{
      weather='https://'+req.hostname+'/uploads/rainy.jpg';
      break;
    }
    case 'snow':{
      weather='https://'+req.hostname+'/uploads/snow.jpg';
      break;
    }
    case 'fog':{
      weather='https://'+req.hostname+'/uploads/fog.jpg';
      break;
    }
    default:{
      weather='https://'+req.hostname+'/uploads/nothing.jpg';
      break;
    }
  }
>>>>>>> 3cfee38ef72deb249750e701b7aec1960994be0d
  res.json({welcome:message,time:time,weather:weather});
});
//-----------------------------------------------------------------------
router.post('/m3',function(req,res){
  var temp=req.body;
  var name=temp.name;
  var weatherinput=temp.weatherinput;
  checkfield(name,weatherinput,res);
  var message='welcome '+name;
  chooseweather(weatherinput,req,res);
<<<<<<< HEAD
=======
=======
>>>>>>> 29c626cfc281b98e0a463eed60a0e03c24017ad6
  var today=new Date();
  var time={
    year:today.getFullYear().toString(),
    month:today.getMonth().toString(),
    day:today.getDay().toString(),
    hour:parseInt(today.getHours()),
    min:parseFloat(today.getMinutes())+0.5
  };
  switch (weatherinput){
    case 'sunny':{
      weather='https://'+req.hostname+'/uploads/'+temp.weatherinput+'.jpg';
      break;
    }
    case 'rainy':{
      weather='https://'+req.hostname+'/uploads/rainy.jpg';
      break;
    }
    case 'snow':{
      weather='https://'+req.hostname+'/uploads/snow.jpg';
      break;
    }
    case 'fog':{
      weather='https://'+req.hostname+'/uploads/fog.jpg';
      break;
    }
    default:{
      weather='https://'+req.hostname+'/uploads/nothing.jpg';
      break;
    }
  }
>>>>>>> 3cfee38ef72deb249750e701b7aec1960994be0d
  res.json({welcome:message,time:time,weather:weather});
});
//-----------------------------------------------------------------------------
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
router.post('/m4',upload.single(),function(req,res){
  var temp=req.body;
  var name=temp.name;
  var weatherinput=temp.weatherinput;
  checkfield(name,weatherinput,res);
  var message='welcome '+name;
  chooseweather(weatherinput,req,res);
  res.json({welcome:message,time:time,weather:weather});
});
module.exports=router;


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
function chooseweather(weatherinput,req,res){
  switch (weatherinput){
    case 'sunny':{
      weather='https://'+req.hostname+'/uploads/sunny.jpg';
<<<<<<< HEAD
=======
=======
>>>>>>> 29c626cfc281b98e0a463eed60a0e03c24017ad6
      weather='https://'+req.hostname+'/uploads/'+temp.weatherinput+'.jpg';
>>>>>>> 3cfee38ef72deb249750e701b7aec1960994be0d
      break;
    }
    case 'rainy':{
      weather='https://'+req.hostname+'/uploads/rainy.jpg';
      break;
    }
    case 'snow':{
      weather='https://'+req.hostname+'/uploads/snow.jpg';
      break;
    }
    case 'fog':{
      weather='https://'+req.hostname+'/uploads/fog.jpg';
      break;
    }
    default:{
      res.json({fail:'請輸入正確天氣'});
<<<<<<< HEAD
=======
=======
>>>>>>> 29c626cfc281b98e0a463eed60a0e03c24017ad6
      weather='https://'+req.hostname+'/uploads/nothing.jpg';
>>>>>>> 3cfee38ef72deb249750e701b7aec1960994be0d
      break;
    }
  }
}

function checkfield(name,weatherinput,res){
  if ((name===undefined)||(name==='')) res.json({fail:'請輸入name'});
  if ((weatherinput===undefined)||(weatherinput==='')) res.json({fail:'請輸入正確天氣'});
}
