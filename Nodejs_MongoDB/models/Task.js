var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var TaskSchema = new Schema({
    title : String,
    content : String,
    created_at : {
        type : Date,
        default : Date.now()
    }
});


TaskSchema.virtual('getDate').get(function(){
    var date = new Date(this.created_at);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    };
});

TaskSchema.plugin( autoIncrement.plugin , { model : "task", field : "id" , startAt : 1 } );
module.exports = mongoose.model('task' , TaskSchema);