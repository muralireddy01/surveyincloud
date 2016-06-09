var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        randomstring = require("randomstring"),
        dbPath = require('../../config/db'),
        mp = require('mongodb-promise'),
        Q = require('q'),
        MongoClient = require('mongodb').MongoClient;

// Create schemas and models for mongo
var urlSchema = mongoose.Schema({
    CG_id: String,
    feedback: String,
    questionA: String,
    questionB: String,
    questionC: String
});
var feedbackModel = mongoose.model('feedback', urlSchema);

module.exports = {
    db: null,
    connect: function () {
        console.log("trying to connect");
        this.db = mongoose.createConnection();
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', function (callback) {
            console.log("Connected to database");
        });
    },
    
    newFeedback : function (url) {
        return new feedbackModel({"CG_id": url.CG_id,   
            "feedback": url.feedback,
            "questionA": url.questionA,
            "questionB": url.questionB,
            "questionC": url.questionC});
    },
    create: function (url, callback) {
        this.connect();
        var data = null;
        var newFeedback = new feedbackModel({"CG_id": url.CG_id,
            "feedback": url.feedback,
            "questionA": url.questionA,
            "questionB": url.questionB,
            "questionC": url.questionC});
                
        var promiseSave = newFeedback.save();
        
        promiseSave.then(function () {
        })
        .catch(console.log);

        return true;
    },
    
    getAll: function (cb) {               
       // console.log("entra");
        //var collection = this.db.get().collection('feedback');

        feedbackModel.find(function(err, docs) {
            //console.log(docs);
            cb(err, docs);

        });
    
    },
 };



