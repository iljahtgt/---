'use strict';

module.exports=function(router){
    router.get('/',function(req,res){
        res.render("pages/basicpages/index")
    });

    router.get('/about',function(req,res){
        res.render("pages/basicpages/about")
    });

    router.get('/contact',function(req,res){
        res.render('pages/basicpages/contact')
    });

    router.get('/mainproduct',function(req,res){
        res.render('pages/productpage/mainproduct')
    });

    router.get('/otherproduct',function(req,res){
        res.render('pages/productpage/otherproduct')
    });
}