"use strict";

var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

/** All actions go through the dispatcher. Just add e.g. a
  * console.log("VIEW_ACTION: ", action) inside of
  * handleViewAction to see all state manipulating
  * actions
  */
var AppDispatcher = assign(new Dispatcher(), {
  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },


  handleServerAction: function(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  }


});

module.exports = AppDispatcher;
