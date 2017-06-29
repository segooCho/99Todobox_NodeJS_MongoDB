var express = require('express');
var router = express.Router();
// Model
var Task = require('../models/Task');
// Return Data
var httpMsgs = require('../views/task/httpMsgs.js');

 
/* GET Task All List */
router.get('/' , function(req, res){
    Task.find({} , function(err, data){
        //res.render('posts/list', { postList : data} );
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

router.post('/write', function(req, res){
    var task = new Task({
        title : req.body.title,
        content : req.body.content
    });

    task.save(function(err){
        httpMsgs.sendNoDataFound(req, res);
    });
});




module.exports = router;
