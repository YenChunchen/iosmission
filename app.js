var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var index = require('./routes/index');
// var users = require('./routes/users');

// var showallmember = require('./Controller/showallmember');   //表示連結至該js檔輸出的模塊,指派給物件showall
// var createmember =require('./Controller/createmember');
// var updatemember =require('./Controller/updatemember');
// var deletemember =require('./Controller/deletemember');
//
//
// var showproducts = require('./Controller/showproducts');
// var deleteitem = require('./Controller/deleteitem');
// var createitem = require('./Controller/createitem');
// var updateitem = require('./Controller/updateitem');
// var showallmember = require('./memberManage/showallmember');
var aaa = require('./memberManage/aaa');
   




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);   //表示路徑,format:(路徑,連結該js檔物件名稱)
// app.use('/users', users);

// app.use('/showallmember', showallmember);
// app.use('/uploads',express.static('uploads'));  //將uploads能讀取靜態檔案,/uploads為路徑
// app.use('/createmember',createmember);
// app.use('/updatemember',updatemember);
// app.use('/deletemember',deletemember);
//
//
// app.use('/showproducts', showproducts);
// app.use('/deleteitem', deleteitem);
// app.use('/createitem', createitem);
// app.use('/updateitem', updateitem);
// app.use('/showallmember', showallmember);
app.use('/aaa', aaa);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
