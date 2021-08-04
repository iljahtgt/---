var express = require('express');
var router = express.Router();
var conn=require('../connect/mysqlconn');

// 建立login路由導向頁面
router.get('/',function(req,res){
    conn.query('select * from member',function(err,rows){
        if(err){
            console.log(err);
        }else{
            var data=rows;
            res.render('pages/memberpages/login',{data:data});//將資料導入對應接收頁面
        }
    });
   
});

//  建立register路由導向頁面
router.route('/register').get(function(req,res){
    res.render('pages/memberpages/register');
})

// 建立/add頁面路由導向
router.route('/add').get(function(req,res,next){
    res.render('pages/memberpages/useradd');
})

// 建立insert功能及導向
router.post('/useradd',function(req,res,next){
    var member={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        birthday:req.body.birthday
    };
    console.log(member);

    var insertsql="insert into member set ?";
    conn.query(insertsql,member,function(err,result){
        if(err){
            console.log(err);
        }else{
            res.render('pages/memberpages/login');
        }
    })
})

// 建立導向/userEdit頁面
router.get('/userEdit',function(req,res,next){
    var id=req.query.id;
    var querysql='select * from member where id = ?';
    console.log("id:"+id);
    conn.query(querysql,id,function(err,rows){
        if(err){
            console.log(err);
        }else{
            var data=rows;
            res.render('pages/memberpages/userEdit',{data:data});
        }
    })
})

//建立Edit post事件
router.post('/userEdit',function(req,res,next){
    var id=req.body.id;
    // console.log(id);
    var modelsql={
        id:req.body.id,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        birthday:req.body.birthday
    };
    var updatesql='update member set ? where id = ?';
    conn.query('update member set ? where id = ?',[modelsql,id],function(err,rows){
        if(err){
            console.log(err);
        }else{
            res.setHeader('Content-Type','application/json');
            res.redirect('/account');
        }
    })
})

router.get('/userDelete',function(req,res,next){
    var id=req.query.id;
    var delsql='delete from member where id = ?';

    conn.query(delsql,id,function(err,rows){
        if(err){
            console.log(err);
        }else{
            res.redirect('/account');
        }
    })


})


module.exports=router;