var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcryptjs=require('bcryptjs');
var MemberSchema=new Schema({
    username:String,
    email:String,
    pwd:Number
},{collection:"MemberList"});

module.exports=mongoose.model('Member',MemberSchema);