var express=require('express');
var router=express.Router();
var url=require('url');
var today=new Date();
var time={
  year:today.getFullYear().toString(),
  month:(today.getMonth()+1).toString(),  //getMonth()預設從0開始故+1
  day:today.getDate().toString(),
  hour:12,
  min:5.5
};
var weather;

/*   mission1   */
router.get('/m1',function(req,res){
  var name=req.query.name;
  var fail;
  if ((name===undefined)||(name==='')) 
  {
    fail={fail:'請輸入name'};
    res.status(400).json({fail:fail });
  }
  var message='welcome '+name;
  var success={
      welcome:message,
      time:time
  };
  //res.json({welcome:message,time:time});
  res.json({success:success});
});

/*   mission2   */
router.get('/m2',function(req,res){
  var weatherinput=req.headers.weatherinput;
  var name=req.headers.name;
  checkField(name,weatherinput,res);
  var message='welcome '+name;
  chooseWeather(weatherinput,req,res);
  var success={
      welcome:message,
      time:time,
      weatherImage:weather
  };
  //res.json({welcome:message,time:time,weather:weather});
  res.json({success:success});
});

/*   mission3   */
router.post('/m3',function(req,res){
  var temp=req.body;
  var name=temp.name;
  var weatherinput=temp.weatherinput;
  checkField(name,weatherinput,res);
  var message='welcome '+name;
  chooseWeather(weatherinput,req,res);
  var success={
      welcome:message,
      time:time,
      weatherImage:weather
  };
  //res.json({welcome:message,time:time,weather:weather});
  res.json({success:success});
});

/*   mission4   */
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
router.post('/m4',upload.single(),function(req,res){
  var temp=req.body;
  var name=temp.name;
  var weatherinput=temp.weatherinput;
  checkField(name,weatherinput,res);
  var message='welcome '+name;
  chooseWeather(weatherinput,req,res);
  var success={
      welcome:message,
      time:time,
      weatherImage:weather
  };
  //res.json({welcome:message,time:time,weather:weather});
  res.json({success:success});
});
module.exports=router;


/*依使用者輸入天氣名稱選擇不同圖片回應*/
function chooseWeather(weatherinput,req,res){
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
      res.json({fail:'請輸入正確天氣'});
      weather='https://'+req.hostname+'/uploads/nothing.jpg';
      break;
    }
  }
}
/*檢查m2,m3,m4使用者輸入欄位是否正確   */
function checkField(name,weatherinput,res){
  var fail;
  if ((name===undefined)||(name==='')) 
  {
    fail={fail:'請輸入name'};
    res.status(400).json({fail:fail });
  }
  if ((weatherinput===undefined)||(weatherinput==='')) 
  {
    fail={fail:'請輸入正確天氣'};
    res.status(400).json({fail:fail });
  }
}
