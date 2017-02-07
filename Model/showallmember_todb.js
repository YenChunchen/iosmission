var connectdb=require('../Controller/connectdb');
exports.getshowall=function (sqlcmd,res) {     //顯示全部資料function
  // var cndb = connectdb.con();   //connect to db(db open)
  connectdb.query(sqlcmd, function(err, rows) {
    if (err) {
      console.log("mysql getQuery error");
      return;
    }
    res.json({member:rows});
  });
};
