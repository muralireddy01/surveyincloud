var db = require('../app/models/shortUrlModel');
var utils = require('../config/utils');
var express = require('express');
var http = require('http');
var request = require("request");
var parseString = require('xml2js').parseString;
var htmlparser = require("htmlparser");
var sys         = require("util");
var Q = require("q"); 
var rp = require('request-promise');

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
        var rawHtml = null;

        var handler = new htmlparser.DefaultHandler(function (error, dom) {
                         console.log(error);     

               });
               var parser = new htmlparser.Parser(handler);
//console.log("PARSER", parser);
//console.log(parser.parseComplete(rawHtml));
//sys.puts(sys.inspect(handler.dom, false, null));

        

        rp("http://rss.betfair.com/RSS.aspx?format=html&sportID=1").then(function(response) { 
            //console.log("RESPONSE", response)
        //rawHtml = response;
               
            parser.parseComplete(response);
       sys.puts(sys.inspect(handler.dom, false, null));       
       // result = parseString(xml);
    
       });
       


       
            
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