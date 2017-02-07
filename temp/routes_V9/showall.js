var express = require('express');
var router = express.Router();
var connectdb=require('./connectdb');  //connect to db module
var fs = require('fs');
router.get('/', function(req, res,next) {
  function getshowall(sqlcmd) {     //顯示全部資料function
    // var cndb = connectdb.con();   //connect to db(db open)
    connectdb.query(sqlcmd, function(err, rows) {
      if (err) {
        console.log("mysql getQuery error");
        return;
      }
      // console.log(rows);
      // cndb.end();    // db close
      res.render('showall',{rows:rows});
    });
  }
  getshowall('SELECT * FROM membertable');
});

module.exports = router;
