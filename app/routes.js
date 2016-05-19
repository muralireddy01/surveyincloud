var db = require('../app/models/shortUrlModel');
var utils = require('../config/utils');
var express = require('express');
var http = require('http');
var request = require("request");
//var parseString = require('xml2js').parseString;
//var htmlparser = require("htmlparser");
var sys         = require("util");
//var Q = require("q"); 
//var rp = require('request-promise');

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
    
    app.post('/save_deal', function (req, res) {
        if (req.body.url === '' || req.body.url === undefined) {
            console.log("BODY", req.body);
            return res.send(400);
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