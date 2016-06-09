var db = require('../app/models/feedbackModel');
var utils = require('../config/utils');
var express = require('express');
var http = require('http');
var request = require("request");
var sys         = require("util");

module.exports = function (app) {

    var buildResponse = function (status, message, result) {
        return {
            "status": status,
            "message": message,
            "result": result
        };
    },
    respond = function (res, data) {
        //console.log("DATA", data);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(data);
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
    
    app.post('/save_feedback', function (req, res) {
        var data = null;
        if (req.body.url === '' || req.body.url === undefined) {
            return res.send(402);
        } else {
            console.log("answers", req.body.url);
            db.create(req.body.url, function(error, creation) {
                console.log(error);
                console.log(creation);
            });
            db.getAll(function(err, docs) {
                data = JSON.stringify(docs);
                           respond(res, data);
            })
            
 
        }
    });

    app.get('/shorten-url', function (req, res) {
        return res.send(200);
    });
    
    app.get('/feedback-topic', function (req, res) {
        res.redirect('/'); //"http://localhost:3000";
    });
    
    app.get('/goal', function (req, res) {
        res.redirect('/'); //"http://localhost:3000";
    });

    app.get('/contact', function (req, res) {

    });

};