/*
 * race
 *
 * Copyright(c) 2014 André König <andre.koenig@konexmedia.com>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@konexmedia.com>
 *
 */

'use strict';

module.exports = function (tasks) {
    var len;

    if ('function' === typeof tasks) {
        tasks = [tasks];
    }

    len = tasks.length;

    return {
        finish : function (callback) {
            var i = 0;
            var task;
            var results = {};
            var executions = 0;
            
            callback = callback || function () {};
            
            function executed (task) {
                return function (err, result) {
                    if (err) {
                        return callback(err);
                    }
                    
                    results[task.name || Date.now()] = result;
                    
                    executions = executions + 1;
                    
                    if (executions === len) {
                        return callback(null, results);
                    }
                };
            }
            
            for (i; i < len; i = i + 1) {
                task = tasks[i];
                
                task(executed(task));
            }
        }
    };
};