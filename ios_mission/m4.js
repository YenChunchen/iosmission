var express=require('express');
var router=express.Router();
var url=require('url');
var fs=require('multer');
router.post('/',function(req,res){
  var temp=req.body;
  console.log(temp.name);
  console.log(temp.weatherinput);
  res.json({temp:temp});
});

module.exports=router;
