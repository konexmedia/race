# race

Runs separate functions in parallel and collects the results. Usable in a browser or node.js environment.

## Installation

    bower install konexmedia/race
    
OR

    component install konexmedia/race

OR

    npm install konexmedia/race

## Usage example

    var race = require('race');

    race([
        function daFirst (callback) {
            setTimeout(function () {
                callback(null, 1);
            }, 200);
        },
        function daSecond (callback) {
            setTimeout(function () {
                callback(null, 'ehlo');
            }, 100);        
        }
    ])
    .finish(function (err, results) {
        if (err) {
            return console.error(err);
        }
        
        console.log(results.daFirst); => 1
        console.log(results.daSecond); => 'ehlo'
    });

## Author

Copyright 2014, [konexmedia](http://konexmedia.com)