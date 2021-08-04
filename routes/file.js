var express = require('express');
var path = require('path');
var router = express.Router();
var multer = require('multer');
// var upload = multer({
//     dest: 'uploads/'
// }).array('file1',10);

function sanitizeFile(file,cb){
    var fileExts=['png','jpg','jpeg','gif'];
    var isAllowedExt = fileExts.includes(
        file.originalname.split('.')[1].toLowerCase());
    var isAllowedMimeType = file.mimetype.startsWith("image/");
    if(isAllowedExt && isAllowedMimeType){
        return cb(null,true);
    }
    else{
        cb('error:File Type Not Allowed',false);
    }
}

var upload = multer({
    storage: multer.diskStorage({
        destination:'uploads/',
        filename:function(req,file,cb){
            cb(null,file.originalname); //cb = callback 預留的回應
        } // originalname => 維持原檔案名
    }),
    limits:{
        fileSize:2048000
    },
    fileFilter:function(req,file,cb){
        sanitizeFile(file,cb);
    },
}).array('file1',10);

var fs=require('fs');

router.route("/list").get(function(req,res){
    var FileArray = [];
    fs.readdir("uploads",function(err,file){
        console.log(file);
        file.forEach(function(files){
            var filepath=path.join("uploads",files);
            FileArray.push({filename:files,filepath:filepath});
            console.log(FileArray);
        });        
        res.render("pages/filepage/list",{files:FileArray})// 屬性是files屬性 值也是叫files
    })
});

router.route("/upload").get(function(req,res){
    res.render("pages/filepage/upload");
}).post(function(req,res){
    upload(req,res,function(err){
        if(err){
            console.log(err);
        }else{
            // req.files.forEach(function(file){
            //     console.log(`${file.originalname} upload success`);
            // });
            req.files.forEach(file=>{
                console.log(`${file.originalname} upload success`);
            })
            res.redirect("/file/list");
        }
    });
});
// get("/upload" => 叫出upload.ejs的form並用post(function(req,res)顯示
// route("/xxxx") => URI => 顯示在網址上
// res.render("pages/xxx/xxx") => 路徑

router.route('/download/:filename').get(function(req,res){
    var filename = req.params.filename;
    var fullname = path.resolve(path.join("uploads",filename));
    console.log(fullname);
    res.download(fullname);
});

module.exports = router;