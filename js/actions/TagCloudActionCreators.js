var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var TagDataAPI = require('../utils/TagDataAPI');

/**
 * ACTIONS
 * Every state change has to be triggered by an action
 * and can only be triggered via an action. Stores do not
 * have any public methods that modify data.
 * That makes it very easy to reason about the dataflow
 * and state.
 */
var TagCloudActions = {
  showTagDetails: function(id) {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.SHOW_TAG_DETAILS,
      id: id
    });
  },

  selectNewRandomTags: function() {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.SELECT_NEW_RANDOM_TAGS
    });
  },

  showOtherTags: function() {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.SHOW_OTHER_TAGS
    });
  },

  loadTopics: function() {
    var data = TagDataAPI.getAll();
    Dispatcher.handleViewAction({
      actionType: ActionTypes.RECEIVE_RAW_TOPICS,
      data: data
    });
  }
};

module.exports = TagCloudActions;