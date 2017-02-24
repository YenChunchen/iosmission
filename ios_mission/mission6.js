var express = require('express');
var router = express.Router();
var upload=require('./form_data_upload_multer');
var fs=require('fs');
/*新建會員*/
router.get('/',function(req,res) {
  var bigPic='https://'+req.hostname+'/uploads/10M.jpg';
  var success={bigPic:bigPic};
  res.json({success:success});
});

module.exports=router;
