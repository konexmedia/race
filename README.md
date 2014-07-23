# race [![Build Status](https://travis-ci.org/konexmedia/race.svg?branch=master)](https://travis-ci.org/konexmedia/race)

Control flow component for executing functions concurrently. Usable in a browser or Node.js environment.

The motivation was to handle the parallel execution of functions without depending on a control flow library like [async]((https://github.com/caolan/async).

## Installation

    bower install konexmedia/race

OR

    npm install konexmedia/race

## Usage example

```javascript
var race = require('race'); // Browser: var race = konexmedia.race;

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
```

## Author

Copyright 2014, [konexmedia](http://konexmedia.com)
