'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

// HACK: fix for https://github.com/facebook/fbjs/issues/47
// TODO: remove when it is fixed in Relay
if (typeof self == 'undefined') {
    (function () {
        var prototype = module.constructor.prototype;
        var require = prototype.require;

        prototype.require = function (path) {
            if (path == 'fbjs/lib/fetch' || path == 'fbjs/lib/fetchWithRetries') {
                return _isomorphicFetch2['default'];
            }
            return require.call(this, path);
        };
    })();
}