'use strict';
const Path = require('path');

let manifest = {
    application: {
        middleware: [{
            module: 'express',
            useFunction: 'static',
            args: ['public/dist']
        }, {
            module: 'morgan',
            args: ['combined']
        }],
        routes: [{
            method: 'GET',
            path: '/',
            handlers: [
                function(req, res) {
                    res.sendFile(Path.join(__dirname, '/views/index.html'));
                }
            ]
        }]
    }
}

module.exports = manifest;
