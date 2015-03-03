"use strict";

var React = require('react');
var TopicStore = require("../stores/TopicStore");
var _ = require('lodash');
var md5 = require('md5').digest_s;
var TagCloudActionCreators = require("../actions/TagCloudActionCreators");
var Router = require('react-router');
var TagCloud = require("./TagCloud.react");
var TagDetails = require("./TagDetails.react");
require("./TagCloudPage.less");

function getTagCloudState() {
  return {topics: TopicStore.getCloudTags()};
}


function selectNewTags() {
  TagCloudActionCreators.selectNewRandomTags();
}

/**
 * TagCloudPage Component represents the Page itself and is registered 
 * a routing desitination
 */
var TagCloudPage = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    TagCloudActionCreators.loadTopics();
    return getTagCloudState();
  },

  componentDidMount: function() {
    TopicStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    TopicStore.removeChangeListener(this.onChange);
  },

  handleSubmit: function(e) {
    e.preventDefault();
  },

  onChange: function() {
    this.setState(getTagCloudState());
  },

  render: function() {
    var createTopicItem = function(topic, index) {
      return <TagCloudTopic
                key={topic.id}
                id={topic.id}
                hashID={topic.hashID}
                label={topic.label}
                rank={index+1}
                score={topic.sentimentScore}
              />;
    };

    return (
      <div className="page tagcloud" id="">
        <h1>My Topics Challenge  <button onClick={selectNewTags}>refresh</button></h1>
        <section className="cloud"><TagCloud topics={this.state.topics}/></section>
        <section className="details">
          <TagDetails hashID={this.getParams().topicHashID} />
         

        </section>

      </div>
    );
  }
});

module.exports = TagCloudPage;
