var express = require('express');
var router = express.Router();

// Model
var Task = require('../models/Task');

// Return Page
var httpMsgs = require('../views/task/httpMsgs.js');

// 파일 저장되는 위치 설정
var path = require('path');
var uploadDir = path.join( __dirname , '../uploads' );
var fs = require('fs');

 //multer 셋팅
var multer  = require('multer');
var storage = multer.diskStorage({
    destination : function (req, file, callback) {
        callback(null, uploadDir );
    },
    filename : function (req, file, callback) {
        callback(null, 'file-' + Date.now() + '.'+ file.mimetype.split('/')[1] );
    }
});
var upload = multer({ storage: storage });








/* GET : Task All List */
router.get('/' , function(req, res){
    Task.find({},{_id:1, nickName:1, phoneNo:1, message:1} , function(err, data){
        if (err) {
            httpMsgs.show500(req, res, err);
        } else {
            if (data.length>0) {
                httpMsgs.sendJson(req, res, data);
            } else {
                httpMsgs.sendNoDataFound(req, res);
            }
        }        
    });
});

/* POST : Task Edit */
router.post('/edit' , function(req, res){
    Task.find({_id :  req.body._id } , function(err, data){
        if (err) {
            httpMsgs.show500(req, res, err);
        } else {
            if (data.length>0) {
                httpMsgs.sendJson(req, res, data);
            } else {
                httpMsgs.sendNoDataFound(req, res);
            }
        }        
    });
});


/* POST : New Task Add */
router.post('/write', upload.single('mediaFile'), function(req, res){
    var task = new Task({
        fromUser : req.body.fromUser,
        nickName : req.body.nickName,
        phoneNo : req.body.phoneNo,
        message : req.body.message,
        mediaFile : (req.file) ? req.file.filename : ""
    });
    task.save(function(err){
        httpMsgs.sendNoDataFound(req, res);
    });
});


module.exports = router;
