var express=require('express');
var router=express.Router();
var conn=require('../connect/mysqlconn');

//index

// emp
// query
    router.get('/',function(req,res){
        var id="";
        var id=req.query.id;
        var filter="";
        
        if(id){
            filter=' where id = ?';
        }
        conn.query('select * from employee'+ filter,id,function(err,rows){
            if(err){
                console.log(err);
            }else{
                var data=rows;
                res.render('pages/adminpages/admindex',{data:data,id:id});//將資料導入對應接收頁面
            }
        });
    });

// create
    router.post('/',function(req,res,next){
        var addEmployee={
            username:req.body.username,
            password:req.body.password,
            gender:req.body.gender,
            email:req.body.email
        };
        var addSql='insert into employee set ?'
        conn.query(addSql,addEmployee,function(err,rows){
            if(err){
                console.log(err);
            }else{
                res.setHeader('Content-Type','application/json');
                res.redirect('http://localhost:8707/admin');
            }
        });
    });

//update
    router.post('/edit',function(req,res,next){
        //post後的參數放form傳過來的指定路徑，不需再加上admin/edit
        // req.body.參數（參數是指）input的name
        var id=req.body.id;
        var updateModel={
            username:req.body.updateusername,
            password:req.body.updatepassword,
            gender:req.body.updategender,
            email:req.body.updateemail
        }
        var updateSql='update employee set ? where id = ?';
        conn.query(updateSql,[updateModel,id],function(err,rows){
            if(err){
                console.log(err);
            }else{
                res.setHeader('Content-Type','application/json');
                res.redirect('http://localhost:8707/admin');
            }
        });
    });

//delete
    router.get('/userDelete',function(req,res,next){
        var id=req.query.id;
        var deleteSql='delete from employee where id = ?';
        // var querySql='select * from employee';

        conn.query(deleteSql,id,function(err,rows){
            if(err){
                console.log(err);
            }
            res.redirect('/admin');
        });
    });

//member
//query
router.get('/memberctl',function(req,res){
    
    var id="";
    var id=req.query.id;
    var filter="";

    if(id){
        filter=' where id = ?';
    }

    conn.query('select * from member'+ filter,id,function(err,row){
        if(err){
            console.log(err);
        }else{
            var data=row;
            res.render('pages/adminpages/memberctl',{data:data,id:id});//將資料導入對應接收頁面
        }
    });
});
//create
router.post('/memberctl',function(req,res){
    var addMem={
        username:req.body.membername,
        email:req.body.memberemail,
        password:req.body.memberpassword,
        gender:req.body.membergender,
        birthday:req.body.memberbirthday
    };
    var addsql='insert into member set ?';

    conn.query(addsql,addMem,function(err){
        if(err){
            console.log(err);
        }else{
            res.setHeader('Conten-Type','application/json');
            res.redirect('http://localhost:8707/admin/memberctl');
        }
    })
})
//update
router.post('/memberctl/Memedit',function(req,res){
    var id=req.body.id;
    var updateMember={
        username:req.body.updateMemname,
        email:req.body.updateMememail,
        password:req.body.updateMempassword,
        gender:req.body.updateMemgender,
        birthday:req.body.updateMembirthday
    }
    var updatesql='update member set ? where id = ?';
    conn.query(updatesql,[updateMember,id],function(err){
        if(err){
            console.log(err);
        }else{
            res.setHeader('Content-Type','application/json');
            res.redirect('http://localhost:8707/admin/memberctl');
        }
    });
});
//delete
router.get('/memberctl/MemDelete',function(req,res){
    var id=req.query.id;
    var deletesql='delete from member where id = ?';
    conn.query(deletesql,id,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('http://localhost:8707/admin/memberctl');
        }
    });
});


//product
//query
router.get('/productctl',function(req,res){
    var quarypro='select * from product';
    var filter="";
    var id="";
    var id=req.query.id;
    if(id){
        filter=' where id = ?';
    }
    conn.query(quarypro+filter,id,function(err,rows){
        if(err){
            console.log(err);
        }else{
            var data=rows;
            res.render('pages/adminpages/productctl.ejs',{data:data,id:id});
        }
    })
})



//error
router.get('/*',function(req,res){
    res.render('pages/basicpages/adminerror')
})
module.exports=router;
