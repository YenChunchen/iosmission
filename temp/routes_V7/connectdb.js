var mysql = new require("mysql");
exports.con=function(){  //連線 function
  var mydb  = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1",
    database: "myfirstdb"
  });
  mydb.connect();
  console.log("mydb connect");
  return mydb;
};
