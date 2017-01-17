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
//    event: String,
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

    create: function (url, callback) {
        this.connect();
        var data = null;
        var newFeedback = new feedbackModel({"CG_id": url.CG_id,
//            "event": url.event,
            "feedback": url.feedback,
            "questionA": url.questionA,
            "questionB": url.questionB,
            "questionC": url.questionC});
        // TODO: Work with chain promise and getAll (Maybe Q)        
        var promiseSave = newFeedback.save();
        
//        promiseSave.then(function () {
//        })
//        .catch(console.log);

        return true;
    },
    
    getAll: function (cb) {               

        feedbackModel.find(function(err, docs) {
            //console.log(docs);
            cb(err, docs);

        });
    
    },
 };



