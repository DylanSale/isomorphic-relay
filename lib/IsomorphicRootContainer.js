'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _IsomorphicRenderer = require('./IsomorphicRenderer');

var _IsomorphicRenderer2 = _interopRequireDefault(_IsomorphicRenderer);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

function IsomorphicRootContainer(_ref) {
    var Component = _ref.Component;
    var forceFetch = _ref.forceFetch;
    var onReadyStateChange = _ref.onReadyStateChange;
    var renderFailure = _ref.renderFailure;
    var renderFetched = _ref.renderFetched;
    var renderLoading = _ref.renderLoading;
    var route = _ref.route;

    return _react2['default'].createElement(_IsomorphicRenderer2['default'], {
        Component: Component,
        forceFetch: forceFetch,
        onReadyStateChange: onReadyStateChange,
        queryConfig: route,
        render: render
    });

    function render(_ref2) {
        var done = _ref2.done;
        var error = _ref2.error;
        var props = _ref2.props;
        var retry = _ref2.retry;
        var stale = _ref2.stale;

        if (error) {
            if (renderFailure) {
                return renderFailure(error, retry);
            }
        } else if (props) {
            if (renderFetched) {
                return renderFetched(props, { done: done, stale: stale });
            } else {
                return _react2['default'].createElement(Component, props);
            }
        } else {
            if (renderLoading) {
                return renderLoading();
            }
        }
        return undefined;
    }
}

IsomorphicRootContainer.propTypes = _reactRelay2['default'].RootContainer.propTypes;
IsomorphicRootContainer.childContextTypes = _reactRelay2['default'].RootContainer.childContextTypes;

exports['default'] = IsomorphicRootContainer;
module.exports = exports['default'];