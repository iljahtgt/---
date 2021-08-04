var express = require('express');
var router = express.Router();
var member=require('../models/Member.js');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var session = require('express-session');

router.route("/login").get(function(req,res){
    res.render('pages/loginpage/login');
}).post(function(req,res){
    console.log(req.body.email);
    console.log(req.body.pwd);
    var email=req.body.email
    var pwd=req.body.pwd

    
})

//驗證機制
// router.post('/login/member',
//             passport.authenticate('local',{failureRedirect:'/account/login',failureFlash:'bad pwd or email'}),
//             function(req,res){
//                 req.flash('success','success login');
//                 res.redirect('/');
//             })

// passport.use('login',new LocalStrategy({passReqToCallback:true}
//     ,function(req,email,pwd,done){
//         member.findOne({email:email},function(err,member){
//             if (err) {
//                 return done(err)
//               }
        
//               if (!user) {
//                 return done(null, false, req.flash('info', 'User not found.'))
//               }
        
//               if (!isValidPassword(user, password)) {
//                 return done(null, false, req.flash('info', 'Invalid password'))
//               }
        
//               return done(null, user)
//         })
//     }))

// router.post("/login/member",function(req,res){
//     console.log(req.body.email);
//     console.log(req.body.pwd);
//     var email=req.body.email
//     var pwd=req.body.pwd

//     member.findOne({email:email,pwd:pwd},function(err,result){
//         if(err){
//             res.send(err);
//         }
//         if(result){ 
//             res.redirect('/');
//         }if(!result){
//             res.redirect('/account/login');
//         }     
//     })
// });

router.route("/register").get(function(req,res){
    res.render('pages/loginpage/register');
}).post(function(req,res){
    console.log(req.body.email);
    console.log(req.body.pwd);
});

// register new member
router.route("/register/new").get(function(req,res){
    member.find(function(err,members){
        if(err){
            res.send(err);
        }else{
            res.json(members);
        }
    });
}).post(function(req,res){
    var m=new member();
    m.username=req.body.username;
    m.email=req.body.email;
    m.pwd=req.body.pwd;
    //console.log(req.body.quantity);
    m.save(function(err,result){
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    });
});





module.exports = router;