var connectdb=require('../memberManage/connectdb');  //connect to db module
exports.getallproducts=function (sqlcmd,response) {     //顯示全部資料function
  connectdb.query(sqlcmd, function(err, rows) {
    if (err) {
      console.log("mysql getQuery error");
      return;
    }
    response.json({item:rows});
  });
};
