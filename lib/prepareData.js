'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = prepareData;

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _reactRelayLibRelayPendingQueryTracker = require('react-relay/lib/RelayPendingQueryTracker');

var _reactRelayLibRelayPendingQueryTracker2 = _interopRequireDefault(_reactRelayLibRelayPendingQueryTracker);

var _reactRelayLibRelayQuery = require('react-relay/lib/RelayQuery');

var _reactRelayLibRelayQuery2 = _interopRequireDefault(_reactRelayLibRelayQuery);

var _reactRelayLibRelayStoreData = require('react-relay/lib/RelayStoreData');

var _reactRelayLibRelayStoreData2 = _interopRequireDefault(_reactRelayLibRelayStoreData);

var _reactRelayLibToGraphQL = require('react-relay/lib/toGraphQL');

var _reactRelayLibToGraphQL2 = _interopRequireDefault(_reactRelayLibToGraphQL);

// HACK: Do not memoize concrete node produced by toGraphQL,
// because it changes RelayQuery.Fragment.getConcreteFragmentID()
// whereas RelayQuery is supposed to be immutable.
// TODO: remove when it is fixed in Relay
_reactRelayLibRelayQuery2['default'].Node.prototype.getConcreteQueryNode = function (onCacheMiss) {
    return onCacheMiss();
};

var globalStoreData = _reactRelayLibRelayStoreData2['default'].getDefaultInstance();

function prepareData(_ref) {
    var Component = _ref.Component;
    var route = _ref.route;

    return new _Promise(function (resolve, reject) {
        var data = [];

        var storeData = new ((function (_RelayStoreData) {
            _inherits(_class, _RelayStoreData);

            function _class() {
                _classCallCheck(this, _class);

                _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(_class, [{
                key: 'handleQueryPayload',
                value: function handleQueryPayload(query, result, forceIndex) {
                    data.push({ query: _reactRelayLibToGraphQL2['default'].Query(query), result: result });

                    globalStoreData.handleQueryPayload(query, result, forceIndex);
                }
            }]);

            return _class;
        })(_reactRelayLibRelayStoreData2['default']))();

        var querySet = _reactRelay2['default'].getQueries(Component, route);

        _reactRelayLibRelayPendingQueryTracker2['default'].resetPending();
        storeData.getQueryRunner().forceFetch(querySet, onReadyStateChange);

        function onReadyStateChange(_ref2) {
            var aborted = _ref2.aborted;
            var done = _ref2.done;
            var error = _ref2.error;
            var stale = _ref2.stale;

            if (error) {
                reject(error);
            } else if (aborted) {
                reject(new Error('Aborted'));
            } else if (done && !stale) {
                resolve(data);
            }
        }
    });
}

module.exports = exports['default'];