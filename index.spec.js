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

/* global expect,it,describe */

'use strict';

var race = require('./');

describe('The "race" component', function () {
    
    it('should be able to perform a parallel function executions', function (done) {
        var executions = 0;

        race([
            function one (cb) {
                executions += 1;
                cb(null);
            },
            function two (cb) {
                executions += 1;
                cb(null);
            }
        ]).finish(function (err, results) {
            expect(err).toBeNull();
            expect(results).toBeDefined();
            expect(executions).toEqual(2);
            
            done();
        });
    });
    
    it('should handle the case where only one function has been passed', function (done) {
        var executions = 0;

        race(function one (callback) {
            executions += 1;
            
            callback(null, 'ehlo');
        }).finish(function (err, results) {
            expect(err).toBeNull();
            expect(executions).toEqual(1);
            expect(results.one).toBeDefined();
            expect(results.one).toEqual('ehlo');
            
            done();
        });
    });
    
    it('should cancel the execution when an error occurred', function (done) {
        var executions = 0;

        race([
            function one (callback) {
                executions += 1;

                callback(null);
            },
            function two (callback) {
                callback(new Error());
            }
        ]).finish(function (err) {
            expect(err).toBeDefined();
            expect(executions).toEqual(1);

            done();
        });
    });
});