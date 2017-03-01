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
    fail={messgae:'請輸入name'};
    res.status(400).json({fail:fail });
  }
  var message='welcome '+name;
  var success={
      welcome:message,
      time:time
  };
  res.json({success:success});
});

/*   mission2   */
router.get('/m2',function(req,res){
  var weatherInput=req.headers.weatherinput;
  var name=req.headers.name;
  var fail;
  if(checkField(name,weatherInput)!==undefined){
    res.json({fail:checkField(name,weatherInput)});
    return;
  }
  var message='welcome '+name;
  if(chooseWeather(weatherInput,req)===false){
    fail={messgae:'請輸入正確天氣'};
    res.json({fail:fail});
    return;
  }
  var success={
      welcome:message,
      time:time,
      weatherImage:weather
  };
  res.json({success:success});
});

/*   mission3   */
router.post('/m3',function(req,res){
  var temp=req.body;
  var name=temp.name;
  var weatherInput=temp.weatherInput;
  var fail;
  if(checkField(name,weatherInput)!==undefined){
    res.json({fail:checkField(name,weatherInput)});
    return;
  }
  var message='welcome '+name;
  if(chooseWeather(weatherInput,req)===false){
    fail={messgae:'請輸入正確天氣'};
    res.json({fail:fail});
    return;
  }
  var success={
      welcome:message,
      time:time,
      weatherImage:weather
  };
  res.json({success:success});
});

/*   mission4   */
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
router.post('/m4',upload.single(),function(req,res){
  var temp=req.body;
  var name=temp.name;
  var weatherInput=temp.weatherInput;
  var fail;
  if(checkField(name,weatherInput)!==undefined){
    res.json({fail:checkField(name,weatherInput)});
    return;
  }
  var message='welcome '+name;
  if(chooseWeather(weatherInput,req)===false){
    fail={messgae:'請輸入正確天氣'};
    res.json({fail:fail});
    return;
  }
  var success={
      welcome:message,
      time:time,
      weatherImage:weather
  };
  res.json({success:success});
});
module.exports=router;


/*依使用者輸入天氣名稱選擇不同圖片回應*/
function chooseWeather(weatherInput,req){
  var count=0;  //計算是否選到對應天氣
  var todayWeather=['sunny','rainy','snow','fog'];
  for(var i =0;i<=todayWeather.length-1;i++){
    if(todayWeather[i]===weatherInput){
      weather='https://'+req.hostname+'/uploads/'+weatherInput+'.jpg';
      count++;
      return true;
    }
  }
  if(count===0)
    return false;
}
/*檢查m2,m3,m4使用者輸入欄位是否正確   */
function checkField(name,weatherInput){
  var fail;
  var errorWeather=checkWeather(weatherInput);
  var errorName=checkName(name);
  if(errorWeather===true){
    fail={messgae:'請輸入正確天氣'};
  }
  if(errorName===true){
    fail={messgae:'請輸入name'};
  }
  if((errorName===true)&&(errorWeather===true)){
    fail={messgae:'請輸入正確天氣及name'};
  }
  return fail;
}
/*檢查天氣*/
function checkWeather(weatherInput){
  if((weatherInput===undefined)||(weatherInput==='')){
    // fail={messgae:'請輸入正確天氣'};
    return true;
  }
  else return false;
}
/*檢查name*/
function checkName(name){
  if ((name===undefined)||(name==='')){
    // fail={messgae:'請輸入name'};
    return true;
  }
  else return false;
}
