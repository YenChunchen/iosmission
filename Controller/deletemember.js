var express = require('express');
var router = express.Router();
var fs = require("fs");
var deletemember_todb=require('../Model/deletemember_todb');
//-----------------------------------------------------
router.delete('/', function(req, res) {
  deletemember_todb.delfile(req,res);
  deletemember_todb.delmember(req,res);
});

module.exports=router;
