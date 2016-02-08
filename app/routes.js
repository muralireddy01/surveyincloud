var db = require('../app/models/shortUrlModel');
var utils = require('../config/utils');
var express = require('express');

module.exports = function (app) {

    var buildResponse = function (status, message, result) {
        return {
            "status": status,
            "message": message,
            "result": result
        };
    },
    respond = function (res, data) {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status);
        res.send(JSON.stringify(data));
    };

    app.post('/create', function (req, res) {
        var data = null;

        if (req.body.url === '' || req.body.url === undefined) {
            return res.send(400);
        }
        db.create(req.body.url, req.body.short, function (err, creation) {
            if (creation) {
                data = buildResponse(201, "Success, short created!", {"url": creation.url, "short": creation.short, "baseurl": utils.getDomain()});
            }
            respond(res, data);
        });
    });

    app.get('/shorten-url', function (req, res) {

    });

    app.get('/contact', function (req, res) {

    });

};