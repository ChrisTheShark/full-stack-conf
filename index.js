'use strict';
const Tape = require('express-tape'),
    manifest = require('./manifest');

let compose = function(callback) {
    Tape.compose(manifest, {
        relativeTo: __dirname
    }, function(error, app) {
        if (!module.parent) {
            app.listen(process.env.PORT || 3000, function(error) {
                if (error) throw error;
            });
        }

        if (callback && typeof callback === 'function') {
            callback(null, app);
        }
    });
}

if (!module.parent) {
    compose();
}

module.exports = compose;
