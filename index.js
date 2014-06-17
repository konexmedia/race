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

function Race () {}

module.exports = function (tasks) {
    if ('function' === typeof tasks) {
        tasks = [tasks];
    }
};