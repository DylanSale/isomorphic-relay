'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _reactRelayLibGraphQLFragmentPointer = require('react-relay/lib/GraphQLFragmentPointer');

var _reactRelayLibGraphQLFragmentPointer2 = _interopRequireDefault(_reactRelayLibGraphQLFragmentPointer);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _reactRelayLibRelayQuery = require('react-relay/lib/RelayQuery');

var _reactRelayLibRelayQuery2 = _interopRequireDefault(_reactRelayLibRelayQuery);

var _reactRelayLibRelayRenderer = require('react-relay/lib/RelayRenderer');

var _reactRelayLibRelayRenderer2 = _interopRequireDefault(_reactRelayLibRelayRenderer);

var _reactRelayLibRelayStoreData = require('react-relay/lib/RelayStoreData');

var _reactRelayLibRelayStoreData2 = _interopRequireDefault(_reactRelayLibRelayStoreData);

var _reactRelayLibCheckRelayQueryData = require('react-relay/lib/checkRelayQueryData');

var _reactRelayLibCheckRelayQueryData2 = _interopRequireDefault(_reactRelayLibCheckRelayQueryData);

var _reactRelayLibFlattenSplitRelayQueries = require('react-relay/lib/flattenSplitRelayQueries');

var _reactRelayLibFlattenSplitRelayQueries2 = _interopRequireDefault(_reactRelayLibFlattenSplitRelayQueries);

var _reactRelayLibSplitDeferredRelayQueries = require('react-relay/lib/splitDeferredRelayQueries');

var _reactRelayLibSplitDeferredRelayQueries2 = _interopRequireDefault(_reactRelayLibSplitDeferredRelayQueries);

var IsomorphicRenderer = (function (_RelayRenderer) {
    _inherits(IsomorphicRenderer, _RelayRenderer);

    function IsomorphicRenderer() {
        _classCallCheck(this, IsomorphicRenderer);

        _get(Object.getPrototypeOf(IsomorphicRenderer.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(IsomorphicRenderer, [{
        key: '_runQueries',
        value: function _runQueries(props) {
            // _runQueries should not be called on server side,
            // so don't call it from constructor, and call it from componentDidMount instead
            return this.state ? _get(Object.getPrototypeOf(IsomorphicRenderer.prototype), '_runQueries', this).call(this, props) : this._buildInitialState();
        }
    }, {
        key: '_buildInitialState',
        value: function _buildInitialState() {
            var _props = this.props;
            var Component = _props.Component;
            var forceFetch = _props.forceFetch;
            var queryConfig = _props.queryConfig;

            var querySet = _reactRelay2['default'].getQueries(Component, queryConfig);
            var fragmentPointers = createFragmentPointersForRoots(querySet);

            var _checkCache = checkCache(querySet);

            var done = _checkCache.done;
            var ready = _checkCache.ready;

            if (ready) {
                var props = _extends({}, queryConfig.params, createFragmentPointersForRoots(querySet));
                var readyState = {
                    aborted: false,
                    done: done && !forceFetch,
                    error: null,
                    mounted: true,
                    ready: true,
                    stale: !!forceFetch
                };
                return this._buildState(Component, queryConfig, readyState, props);
            }

            return this._buildState(null, null, null, null);
        }
    }, {
        key: '_buildState',
        value: function _buildState(activeComponent, activeQueryConfig, readyState, props) {
            var _this = this;

            return {
                activeComponent: activeComponent,
                activeQueryConfig: activeQueryConfig,
                readyState: readyState && _extends({}, readyState, { mounted: true }),
                renderArgs: {
                    done: !!readyState && readyState.done,
                    error: readyState && readyState.error,
                    props: props,
                    retry: function retry() {
                        return _this._retry();
                    },
                    stale: !!readyState && readyState.stale
                }
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var readyState = this.state.readyState;

            if (!readyState || !readyState.done) {
                this._runQueries(this.props);
            }
        }
    }]);

    return IsomorphicRenderer;
})(_reactRelayLibRelayRenderer2['default']);

IsomorphicRenderer.propTypes = _reactRelayLibRelayRenderer2['default'].propTypes;
IsomorphicRenderer.childContextTypes = _reactRelayLibRelayRenderer2['default'].childContextTypes;

exports['default'] = IsomorphicRenderer;

var queuedStore = _reactRelayLibRelayStoreData2['default'].getDefaultInstance().getQueuedStore();

function checkCache(querySet) {
    var done = true;
    var ready = _Object$keys(querySet).every(function (name) {
        return (0, _reactRelayLibFlattenSplitRelayQueries2['default'])((0, _reactRelayLibSplitDeferredRelayQueries2['default'])(querySet[name])).every(function (query) {
            if (!(0, _reactRelayLibCheckRelayQueryData2['default'])(queuedStore, query)) {
                done = false;
                if (!query.isDeferred()) {
                    return false;
                }
            }
            return true;
        });
    });
    return { done: done, ready: ready };
}

function createFragmentPointersForRoots(querySet) {
    var fragmentPointers = {};

    _Object$keys(querySet).forEach(function (name) {
        fragmentPointers[name] = createFragmentPointerForRoot(querySet[name]);
    });
    return fragmentPointers;
}

var createFragmentPointerForRoot = function createFragmentPointerForRoot(query) {
    return query && _reactRelayLibGraphQLFragmentPointer2['default'].createForRoot(queuedStore, query);
};
module.exports = exports['default'];