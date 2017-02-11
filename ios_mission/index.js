var express=require('express');
var router=express.Router();
var url=require('url');
var today=new Date();
var time={
  year:"2017",
  month:"2",
  day:"28",
  hour:parseInt("12"),
  min:parseFloat("15.5")
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
  res.json({welcome:message,time:time});
});

/*   mission2   */
router.get('/m2',function(req,res){
  var weatherinput=req.headers.weatherinput;
  var name=req.headers.name;
  CheckField(name,weatherinput,res);
  var message='welcome '+name;
  ChooseWeather(weatherinput,req,res);
  res.json({welcome:message,time:time,weather:weather});
});

/*   mission3   */
router.post('/m3',function(req,res){
  var temp=req.body;
  var name=temp.name;
  var weatherinput=temp.weatherinput;
  CheckField(name,weatherinput,res);
  var message='welcome '+name;
  ChooseWeather(weatherinput,req,res);
  var success={
      welcome:message,
      time:time,
      weather:weather
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
  CheckField(name,weatherinput,res);
  var message='welcome '+name;
  ChooseWeather(weatherinput,req,res);
  res.json({welcome:message,time:time,weather:weather});
});
module.exports=router;


/*依使用者輸入天氣名稱選擇不同圖片回應*/
function ChooseWeather(weatherinput,req,res){
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
function CheckField(name,weatherinput,res){
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
