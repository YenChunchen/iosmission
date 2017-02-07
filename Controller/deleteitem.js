var express = require('express');
var router = express.Router();
var deleteproduct_todb=require('../Model/deleteproduct_todb');
router.delete('/', function(req, res) {
  var delitems =req.body.id;
  console.log(delitems );
  var delstr="DELETE  FROM products WHERE id=";
  var selstr="SELECT * FROM products WHERE id=";   //暫存每次呼叫選取sql cmd
  for(var i in delitems)
  {
    deleteproduct_todb.delfiles(selstr+delitems[i],res);
    console.log(delitems[i]);
    deleteproduct_todb.delproducts(delstr+delitems[i],res);
  }
});

module.exports = router;
