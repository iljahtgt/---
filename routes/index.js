'use strict';

module.exports = function(router){
router.get('/',function(req,res){
res.render("pages/basicpage/index")
});

router.get('/about',function(req,res){
    res.render("pages/basicpage/about")
});

router.get('/contactus',function(req,res){
    res.render("pages/basicpage/contactus")
})

router.get('/show',function(req,res){
    res.render("pages/basicpage/show")
})



}