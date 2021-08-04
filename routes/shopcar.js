var express = require('express');
var router = express.Router();
var product=require('../models/Product.js');


router.route("/").get(function(req,res){
    res.render('pages/shopcarpages/shopcar');
});

//全部查詢
router.route("/bill").get(function(req,res){
    product.find(function(err,products){
        if(err){
            res.send(err);
        }else{
            res.json(products);
        }
    });
});

//用title查詢
router.route('/bill/:title').get(function(req,res){
    product.find({title:req.params.title},function(err,product){
        if(err){
            res.send(err);
        }
        else{
        res.json(product);
        }
    });
});

//新增
router.route("/bill").post(function(req,res){
    var p=new product();
    p.title=req.body.title;
    p.price=req.body.price;
    p.quantity=req.body.quantity;
    console.log(req.body.quantity);
    p.save(function(err,result){
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    });
});

//修改
router.route("/bill").put(function(req,res){
    product.updateOne({title:req.body.title},
        {title:req.body.title,
        price:req.body.price,
        quantity:req.body.quantity
    },function(err,result){
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    });
});

//刪除
router.route("/bill/:title").delete(function(req,res){
    product.remove({title:req.params.title},function(err,product){
        if(err){
            res.send(err);
        }else{
            res.json(product);
        }
    });
});

module.exports = router;