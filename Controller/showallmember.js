var express = require('express');
var router = express.Router();
var showallmember_todb=require('../Model/showallmember_todb');
router.get('/', function(req, res,next) {
  showallmember_todb.getshowall('SELECT * FROM membertable',res);
});

module.exports = router;
