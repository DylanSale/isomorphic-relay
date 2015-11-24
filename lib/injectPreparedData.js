'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = injectPreparedData;

var _reactRelayLibFromGraphQL = require('react-relay/lib/fromGraphQL');

var _reactRelayLibFromGraphQL2 = _interopRequireDefault(_reactRelayLibFromGraphQL);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _reactRelayLibRelayMetaRoute = require('react-relay/lib/RelayMetaRoute');

var _reactRelayLibRelayMetaRoute2 = _interopRequireDefault(_reactRelayLibRelayMetaRoute);

var _reactRelayLibRelayQuery = require('react-relay/lib/RelayQuery');

var _reactRelayLibRelayQuery2 = _interopRequireDefault(_reactRelayLibRelayQuery);

var _reactRelayLibRelayStoreData = require('react-relay/lib/RelayStoreData');

var _reactRelayLibRelayStoreData2 = _interopRequireDefault(_reactRelayLibRelayStoreData);

var storeData = _reactRelayLibRelayStoreData2['default'].getDefaultInstance();

function injectPreparedData(data) {
    data.forEach(function (_ref) {
        var concreteQuery = _ref.query;
        var result = _ref.result;

        var query = _reactRelayLibFromGraphQL2['default'].Query(concreteQuery);

        storeData.handleQueryPayload(query, result);
    });
}

module.exports = exports['default'];