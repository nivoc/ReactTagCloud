
var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router');
var md5 = require('md5').digest_s;
var Link = Router.Link;
require("./TagCloudTopic.less");

/**
 * TagCloudTopic Component represents one single Word in the TagCloud
 *
 * @param {Number} score The sentiment score determins the color
 * @param {Number} rank The rank (1 to 6) determins the font size
 */
var TagCloudTopic = React.createClass({
  propTypes: {
    score: PropTypes.number.isRequired,
    rank: PropTypes.number.isRequired,
  },

  scoreClassName: function() {
    if (this.props.score > 60) {
      return "positive";
    } else if ( this.props.score < 40 ){
      return "negative";
    }
    return "neutral";
  },

  rankClassName: function() {
   return "rank" + this.props.rank;
  },

  calcMargin: function(rank) {
    return ((this.props.rank * 15) - 10) + "%"
  },

  render: function() {
    var position = {
      marginLeft: this.calcMargin(this.props.rank)
    };

    return (
      <div className="tag_cloud_topic">
        <Link to="tagCloudDetail" params={{topicHashID: md5(this.props.id)}}
           className={[this.scoreClassName(), this.rankClassName()].join(" ")}
           style={position}>
           {this.props.label}
        </Link>
      </div>
    );
  }
});

module.exports = TagCloudTopic;