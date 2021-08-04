var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ProductSchema=new Schema({
    title:String,
    price:Number,
    quantity:Number
},{collection:"AIEN12Collection"});

module.exports=mongoose.model('Product',ProductSchema);