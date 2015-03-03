"use strict";
var React = require('react/addons');
var PropTypes = React.PropTypes;
var Router = require('react-router');
var md5 = require('md5').digest_s;
var _ = require('lodash');
var TagCloudTopic = require("./TagCloudTopic.react");

/**
 * TagCloud displays a basic TagCloud build of TagCloudTopics.
 * It shows the provided topics in a pseudo-random order. To be
 * more specific it displays the topics sorted by hashID. This results
 * into a random order but is rerender-save because the same collection of
 * topics would result into the same random order.
 *
 * @param {Array} topics The selected topics that should be displayed.
 */
var TagCloud = React.createClass({
  mixins: [Router.Navigation],
  propTypes: {
    topics: PropTypes.array.isRequired
  },

  _clearSelection: function(e) {
    if (e.target.tagName === "DIV") {
      this.transitionTo('tagCloud');
    }
  },

  render: function() {
    var createTopicItem = function(topic, index) {
      return <TagCloudTopic
                key={topic.id}
                id={topic.id}
                hashID={topic.hashID}
                label={topic.label}
                rank={index + 1}
                score={topic.sentimentScore}
              />;
    };

    // _map: Create a TagItem for every Topic in props.topics than
    // _sortBy(md5 of ID): to shuffle the tags into a random but
    // reproducable order.
    return (
      <div className="tagCloud" onClick={_.bind(this._clearSelection, this)}>
        { _.sortBy( _.map(this.props.topics, createTopicItem),
          function(n){
            return md5(n.key);
          })
        }
      </div>
    );
  }
});

module.exports = TagCloud;