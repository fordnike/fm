'use strict';
var app = require('express')();
var fs = require('fs');

function getSettings(callback) {
    fs.readFile('./www/mock/config.json', 'utf8', function (err, read) {

        var defaultConfig = {
            delay: 0,
            randomDelay: 0,
            mocks: {}
        };

        if (err) {
            console.error(err);
            return callback(defaultConfig);
        }
        try {
            read = JSON.parse(read);
        } catch (e) {
            read = {};
        }

        defaultConfig.delay = parseFloat(read.delay || defaultConfig.delay);
        defaultConfig.randomDelay = parseFloat(read.randomDelay || defaultConfig.randomDelay);

        callback(defaultConfig);
    });
}

function serveMock(req, res) {
    fs.readFile('www' + req.path, 'utf8', function (err, data) {
        if (err) {
            res.status(404);
            res.json({error: err});
            return console.log('404 not found: ', req.path);
        }
        try {
            // function that return response depending on config
            var returnResponse = function (config) {
                var response = JSON.parse(data);
                var delay = Math.floor(Math.random() * config.randomDelay + config.delay);
                console.log(req.path, 'delayed ' + delay + 'ms');
                setTimeout(function () {
                    res.json(response);
                }, delay);
            };
            // returnResponse after getting settings
            getSettings(returnResponse);

        } catch (exception) {
            console.error(req.path, 'cannot parse JSON', data);
            res.status(500);
            res.end(data);
        }
    });
}

app.get('/mock/*', serveMock);
app.post('/mock/*', serveMock);

module.exports = app;
