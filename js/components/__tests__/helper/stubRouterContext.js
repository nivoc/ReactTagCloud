"use strict";
var React = require('react');
var func = React.PropTypes.func;

var stubRouterContext = function (Component, props, stubs) {
  return React.createClass({
    displayName: "WrapperForTest",
    childContextTypes: {
    makePath: func,
    makeHref: func,
    transitionTo: func,
    replaceWith: func,
    goBack: func,
    getCurrentPath: func,
    getCurrentRoutes: func,
    getCurrentPathname: func,
    getCurrentParams: func,
    getCurrentQuery: func,
    isActive: func },

  getChildContext: function getChildContext() {
    return {
      makePath: function makePath() {},
      makeHref: function makeHref() {},
      transitionTo: function transitionTo() {},
      replaceWith: function replaceWith() {},
      goBack: function goBack() {},
      getCurrentPath: function getCurrentPath() {},
      getCurrentRoutes: function getCurrentRoutes() {},
      getCurrentPathname: function getCurrentPathname() {},
      getCurrentParams: function getCurrentParams() {},
      getCurrentQuery: function getCurrentQuery() {},
      isActive: function isActive() {} };
  },


    render: function render() {
      return React.createElement(Component, props);
    }
  });
};

module.exports = stubRouterContext;