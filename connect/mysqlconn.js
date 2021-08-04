// mysql connect

var mysql=require('mysql');
var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"huginn"
});
conn.connect(function(error){
    if(error){
        console.log(error)
    }else{
        console.log("mysql connected");
    }
});

module.exports=conn;