var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/database.js');
var conn = mysql.createConnection(db.connection);

conn.query('USE '+ db.database);

module.exports=function(){

    router.post('/emailCheck',function(req,res){
        var sql = "select email from huginn.member where email = ?";
        var email = [req.body.email];
        console.log(email);
        conn.query(sql,email,function(err,result){
            if(err){
                res.send({essage:err});
            }else{
                res.send(result);
            }
        })
    })
}