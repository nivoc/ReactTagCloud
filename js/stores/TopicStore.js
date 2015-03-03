var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');
var md5 = require('md5').digest_s;
var _ = require('lodash');

var CHANGE_EVENT = 'change';
var NUMBER_OF_CLOUD_ENTRIES = 6;

var _topics = {};
var _activeTopics = {};

function selectNewRandomTags(cnt){
  _activeTopics = _.sortBy(_.sample(_topics, cnt), function(n) {
    return -1 * n.volume;
  });
}

function topicsReceived(data){
  _.each(data.topics, function(n) {
    n.hashID = md5(n.id);
    _topics[n.hashID] = n;
  });
  selectNewRandomTags(NUMBER_OF_CLOUD_ENTRIES);
}


/**
 * TopicStore contains all Topics. It wait for incomming RawTopics
 * from the server. Once received it stores it inside.
 * The Store also creates a hashID for every topic because some ID
 * contain not URL-Save-Characters.
 *
 * The store exposes _only_ read methods. Modifications can only
 * be triggered via Actions. The store registers on relvant actions
 * at the dispatcher.
 */
var TopicStore = assign({}, EventEmitter.prototype, {

  getCloudTags: function() {
    return _activeTopics;
  },

  getByID: function(id) {
    return _topics[md5(id)];
  },

  getByHash: function(hash) {
    return _topics[hash];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


// Dispatcher handles _all_ modifications of the store.
// It ensures that nobody can directly modify data wihout
// telling others. Store is the only data owner.
Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.RECEIVE_RAW_TOPICS:
      topicsReceived(action.data);
      TopicStore.emitChange();
      break;

    case ActionTypes.SELECT_NEW_RANDOM_TAGS:
      selectNewRandomTags(NUMBER_OF_CLOUD_ENTRIES);
      break;

    default:
      return true;
  }

  // Every action results into a data change and need to
  // emit the change event.
  TopicStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
});


module.exports = TopicStore;
