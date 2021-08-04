var express = require('express');
var router = express.Router();

router.route("/mainproduct").get(function(req,res){
    res.render('pages/productpage/mainproduct');
});

router.route("/otherproduct").get(function(req,res){
    res.render('pages/productpage/otherproduct');
});
module.exports = router;