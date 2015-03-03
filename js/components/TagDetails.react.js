"use strict";

var React = require('react');
var TopicStore = require("../stores/TopicStore");
var PropTypes = React.PropTypes;

require("./TagDetails.less");

function dataFor(hashID) {
    var topicDetails;
    if (hashID) {
      topicDetails = TopicStore.getByHash(hashID);
    }

    if (typeof topicDetails === 'object') {
      return topicDetails;
    }
    return {};
}

/**
 * TagDetails displays the metadata. It takes only a topics hashID
 * and gets all the details from the Store. 
 *
 * @param {String} hashID of a topic
 */
var TagDetails = React.createClass({
  propTypes: {
    hashID: PropTypes.string
  },

  getInitialState: function() {
    return dataFor(this.props.hashID);
  },

  componentWillReceiveProps: function(nextProps) {
    this.replaceState(dataFor(nextProps.hashID));
  },

  numberOrZero: function(kind){
      if ( typeof this.state.sentiment !== "object" ) {
        return 0
      }

      if ( typeof this.state.sentiment[kind] === "number" ) {
        return this.state.sentiment[kind]
      }
      return 0;
  },

  showHide: function() {
    if (this.state.label) {
      return "show";
    }
    return "hide";
  },

  render: function() {
    return (
      <div className={"tag_details "+ this.showHide()} >
        <h2>Information on topic "{this.state.label}"</h2>
        <p>Total Mentions: <b className="mentions">{this.state.volume}</b></p>
        <ul>
          <li>Positiv Mentions: 
            <b className="positive"> {this.numberOrZero("positive")}</b>
          </li>
          <li>Neutral Mentions: 
            <b className="neutral"> {this.numberOrZero("neutral")}</b>
          </li>
          <li>Negative Mentions: 
            <b className="negative"> {this.numberOrZero("negative")}</b>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = TagDetails;
