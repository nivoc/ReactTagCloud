jest.dontMock('../TagCloud.react.js');
jest.dontMock('react-router');
jest.dontMock('md5');
jest.dontMock('lodash');
jest.dontMock('./helper/stubRouterContext');

var React = require('react/addons');
var stubRouterContext = require('./helper/stubRouterContext');
var TagCloud = require('../TagCloud.react');
var TagCloudTopic = require('../TagCloudTopic.react');
var TestUtils = React.addons.TestUtils;
var _ = require('lodash');


describe('Component TagCloud', function() {
  var DEFAULT_PROPS = {topics: [{"id":"1751295897__Quantified Drunk","label":"Quantified Drunk","volume":14,"type":"topic","sentiment":{"neutral":14},"sentimentScore":50,"burst":7,"days":[{"date":"2014-06-06T00:00:00.000+0000","volume":1},{"date":"2014-06-04T00:00:00.000+0000","volume":8},{"date":"2014-06-09T00:00:00.000+0000","volume":0},{"date":"2014-06-07T00:00:00.000+0000","volume":0},{"date":"2014-06-08T00:00:00.000+0000","volume":1},{"date":"2014-06-03T00:00:00.000+0000","volume":0},{"date":"2014-06-05T00:00:00.000+0000","volume":4}],"pageType":{"blog":0,"facebook":3,"forum":0,"general":0,"image":0,"news":0,"review":0,"twitter":11,"video":0},"queries":[{"id":1751295897,"name":"Berghain","volume":14}],"hashID":"e43a404ede236ebc6510ea6ee0e2be12"},{"id":"1751295897__Amsterdam","label":"Amsterdam","volume":12,"type":"topic","sentiment":{"neutral":7,"positive":5},"sentimentScore":91,"burst":25,"days":[{"date":"2014-06-06T00:00:00.000+0000","volume":1},{"date":"2014-06-04T00:00:00.000+0000","volume":2},{"date":"2014-06-09T00:00:00.000+0000","volume":0},{"date":"2014-06-07T00:00:00.000+0000","volume":3},{"date":"2014-06-08T00:00:00.000+0000","volume":0},{"date":"2014-06-03T00:00:00.000+0000","volume":2},{"date":"2014-06-05T00:00:00.000+0000","volume":4}],"pageType":{"blog":1,"facebook":4,"forum":2,"general":2,"image":0,"news":2,"review":1,"twitter":0,"video":0},"queries":[{"id":1751295897,"name":"Berghain","volume":12}],"hashID":"425ba0dab7f9b33da3eb4ffc71bf7ab3"},{"id":"1751295897__London","label":"London","volume":11,"type":"topic","sentiment":{"neutral":8,"positive":3},"sentimentScore":77,"burst":9,"days":[{"date":"2014-06-06T00:00:00.000+0000","volume":1},{"date":"2014-06-04T00:00:00.000+0000","volume":2},{"date":"2014-06-09T00:00:00.000+0000","volume":0},{"date":"2014-06-07T00:00:00.000+0000","volume":1},{"date":"2014-06-08T00:00:00.000+0000","volume":0},{"date":"2014-06-03T00:00:00.000+0000","volume":5},{"date":"2014-06-05T00:00:00.000+0000","volume":2}],"pageType":{"blog":1,"facebook":5,"forum":1,"general":1,"image":0,"news":2,"review":0,"twitter":1,"video":0},"queries":[{"id":1751295897,"name":"Berghain","volume":11}],"hashID":"7f20834b266627be15a19dd2a53a9cdc"},{"id":"1751295897__Watergate","label":"Watergate","volume":7,"type":"topic","sentiment":{"neutral":6,"positive":1},"sentimentScore":64,"burst":14,"days":[{"date":"2014-06-06T00:00:00.000+0000","volume":2},{"date":"2014-06-04T00:00:00.000+0000","volume":2},{"date":"2014-06-09T00:00:00.000+0000","volume":0},{"date":"2014-06-07T00:00:00.000+0000","volume":0},{"date":"2014-06-08T00:00:00.000+0000","volume":1},{"date":"2014-06-03T00:00:00.000+0000","volume":1},{"date":"2014-06-05T00:00:00.000+0000","volume":1}],"pageType":{"blog":1,"facebook":3,"forum":1,"general":0,"image":0,"news":0,"review":0,"twitter":2,"video":0},"queries":[{"id":1751295897,"name":"Berghain","volume":7}],"hashID":"f90fac30550382b2ee05f58316af7d62"},{"id":"1751295897__Panorama Bar in Berlin","label":"Panorama Bar in Berlin","volume":6,"type":"topic","sentiment":{"neutral":4,"positive":2},"sentimentScore":83,"burst":50,"days":[{"date":"2014-06-06T00:00:00.000+0000","volume":0},{"date":"2014-06-04T00:00:00.000+0000","volume":1},{"date":"2014-06-09T00:00:00.000+0000","volume":0},{"date":"2014-06-07T00:00:00.000+0000","volume":2},{"date":"2014-06-08T00:00:00.000+0000","volume":1},{"date":"2014-06-03T00:00:00.000+0000","volume":1},{"date":"2014-06-05T00:00:00.000+0000","volume":1}],"pageType":{"blog":0,"facebook":5,"forum":0,"general":0,"image":0,"news":1,"review":0,"twitter":0,"video":0},"queries":[{"id":1751295897,"name":"Berghain","volume":6}],"hashID":"2147d0058267d59ecad7876110eb4455"},{"id":"1751295897__legendary nightclub","label":"legendary nightclub","volume":6,"type":"topic","sentiment":{"positive":6},"sentimentScore":150,"burst":0,"days":[{"date":"2014-06-06T00:00:00.000+0000","volume":1},{"date":"2014-06-04T00:00:00.000+0000","volume":0},{"date":"2014-06-09T00:00:00.000+0000","volume":0},{"date":"2014-06-07T00:00:00.000+0000","volume":0},{"date":"2014-06-08T00:00:00.000+0000","volume":0},{"date":"2014-06-03T00:00:00.000+0000","volume":5},{"date":"2014-06-05T00:00:00.000+0000","volume":0}],"pageType":{"blog":1,"facebook":3,"forum":0,"general":0,"image":0,"news":0,"review":0,"twitter":0,"video":2},"queries":[{"id":1751295897,"name":"Berghain","volume":6}],"hashID":"4563530bf98642a8525f4815b7087864"}]};
  // hashID: rank
  var EXPECTED_RANK = {
    "e43a404ede236ebc6510ea6ee0e2be12": 1,
    "425ba0dab7f9b33da3eb4ffc71bf7ab3": 2,
    "7f20834b266627be15a19dd2a53a9cdc": 3,
    "f90fac30550382b2ee05f58316af7d62": 4,
    "2147d0058267d59ecad7876110eb4455": 5,
    "4563530bf98642a8525f4815b7087864": 6
  };


  var getRenderedTags = function(props) {
    var TagCloudWithCtx = stubRouterContext(TagCloud, props);
    var tagCloud = TestUtils.renderIntoDocument(
        <TagCloudWithCtx />
    );

    return TestUtils.scryRenderedDOMComponentsWithClass(
        tagCloud, 'tagCloud');
  };
  var a = getRenderedTags(DEFAULT_PROPS);

  it('creates a TagCloudTopics for every supplied topic', function() {
    var checkIfTopicGotCallWithAllProps = function(topic) {
      var found = _.find(TagCloudTopic.mock.calls, function(item) {
        return item[0].id == topic.id
      })

      if (found !== undefined) {
        found = found[0];
      } else {
        return false; //not found
      }

      describe('TagCloudTopic got created', function() {
        it('got supplied with the correct params', function() {
          expect(found.hashID).toBe(topic.hashID)
          expect(found.label).toBe(topic.label)
          // expect(found.rank).toBe(topic.rank)
          expect(found.score).toBe(topic.sentimentScore)
        });
        it('got created with the correct rank', function() {
          expect(found.rank).toBe(EXPECTED_RANK[found.hashID])
        });
      });
      return true;
    }

    // Check that all props got supmitted and remove if all 
    // found ones
    var leftOver = _.reject(DEFAULT_PROPS.topics, checkIfTopicGotCallWithAllProps);
    expect(leftOver.length).toBe(0)
  });

  it('creates a TagCloudTopics in pseudo-random order (hash-sorted)', function() {
    var extractKeys = function(item) {
      return item[0].hashID;
    }

    var hashKeys = _.map(TagCloudTopic.mock.calls, extractKeys)

    //check with every if all in order
    var allInOrder = _.every(hashKeys, function(value, index, array) {
      return index === 0 || array[index - 1] <= value;
    });

    expect(allInOrder).toBe(true);
  });

});
