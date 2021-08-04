var express=require('express');
var product=require('../models/Product.js');
var apirouter=express.Router();

//全部查詢
apirouter.route("/products").get(function(req,res){
    product.find(function(err,products){
        if(err){
            res.send(err);
        }else{
            res.json(products);
        }
    });
});

//用title查詢
apirouter.route('/products/:title').get(function(req,res){
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
apirouter.route("/products").post(function(req,res){
    console.log(req.body.title);
    var p=new product();
    p.title=req.body.title;
    p.price=req.body.price;
    p.instock=req.body.instock;
    p.save(function(err,result){
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    });
});

//修改
apirouter.route("/products").put(function(req,res){
    product.updateOne({title:req.body.title},
        {title:req.body.title,
        price:req.body.price,
        instock:req.body.instock
    },function(err,result){
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    });
});

//刪除
apirouter.route("/products/:title").delete(function(req,res){
    product.remove({title:req.params.title},function(err,product){
        if(err){
            res.send(err);
        }else{
            res.json(product);
        }
    });
});

module.exports=apirouter;