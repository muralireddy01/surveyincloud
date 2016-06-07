var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        randomstring = require("randomstring"),
        dbPath = require('../../config/db');

// Create schemas and models for mongo
var urlSchema = mongoose.Schema({
    CG_id : String,
    feedback: String,
    questionA: String,
    questionB: String,
    questionC: String    
});
var urlModel = mongoose.model('feedback', urlSchema)

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
        var newFeedback = new urlModel({"CG_id" : url.CG_id,
                                        "feedback": url.feedback,
                                        "questionA": url.questionA,
                                        "questionB": url.questionB,
                                        "questionC": url.questionC});

        newFeedback.save(function (error) {
            if (error) {
                console.log("Write to mongo failed");
                console.log(error);
                        callback("Write to mongo failed", null);
            }
                   callback(null, newFeedback);
                });
    }
};



