'use strick';

const {request} = require('express');
var http = require('http');
var port = process.env.PORT || 1214;
var path = require('path');
var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var routes = require('./routes/index.js');
var account = require('./routes/account.js');
var file = require('./routes/file.js');
var product = require('./routes/product.js');
var shopcar =require('./routes/shopcar.js');
var mongoose=require('mongoose');
var cors=require('cors');
var productService=require("./api/ProductService.js");
var flash=require('connect-flash');
var favicon=require('serve-favicon');

app.use("/api",productService);

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'uploads')));
app.use(favicon(path.join(__dirname,'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

routes(router);
app.use("/",router);
app.use("/account",account);
app.use("/file",file);
app.use("/product",product);
app.use("/shopcar",shopcar);
app.use(cors());
app.use(flash());
// app.use("/api",productService);
app.get('*',function(req,res){
    res.render("pages/error")
});

// app.use(session({ 
//     secret: 'your secret key',
//     resave: false,
//     saveUninitialized: false
//   }));
//   app.use(passport.initialize())
//   app.use(passport.session())
//mongodb
mongoose.connect('mongodb://localhost:27017/AIEN12DB');


app.listen(port);
console.log(`server listing on${port}`);