var fs=require('fs');
exports.base64_encode=function(file) {   //img 轉 base64 string
  // console.log('+++');
  var bitmap = fs.readFileSync('productsManage/itemspic/'+file);  //存放該路徑檔案
  var base64str=new Buffer(bitmap).toString('base64');  //轉base64
  return base64str;
};
