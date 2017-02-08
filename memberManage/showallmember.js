var express = require('express');
var router = express.Router();
var connectdb=require('./connectdb');  //connect to db module
var fs = require('fs');
router.get('/', function(req, res,next) {
  getshowall('SELECT * FROM membertable',res);
});

module.exports = router;


function getshowall(sqlcmd,res) {     //顯示全部資料function
  // var cndb = connectdb.con();   //connect to db(db open)
  connectdb.query(sqlcmd, function(err, rows) {
    if (err) {
      console.log("mysql getQuery error");
      return;
    }
    res.json({member:rows});
  });
}
