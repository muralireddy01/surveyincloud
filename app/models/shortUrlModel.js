// Load dependencies
var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        randomstring = require("randomstring"),
        dbPath = require('../../config/db');

// Create schemas and models for mongo
var urlSchema = mongoose.Schema({
    url: String,
    short: String
});
var urlModel = mongoose.model('url', urlSchema)

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
    checkUrl: function (url, callback) {
        urlModel.findOne({'url': url}, function (err, url) {
            callback(err, url);
        });
    },
    generateShort: function () {
        var short = randomstring.generate(7);
        return short;
    },
    create: function (url, short, callback) {
        this.connect();
        var that = this;
        this.checkUrl(url, function (err, result) {
            console.log("Result", result);
            if (result !== null) {
                console.log("Returning shortUrl already saved");
                callback(null, result);
            } else {
                short = that.generateShort();
                var newUrl = new urlModel({"url": url, "short": short});
                console.log("Saving new shortUrl");
                newUrl.save(function (error) {
                    if (error) {
                        console.log("Write to mongo failed");
                        console.log(error);
                        callback("Write to mongo failed", null);
                    }
                    callback(null, newUrl);
                });
            }
        });
    }
};

