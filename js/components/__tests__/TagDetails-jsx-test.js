jest.dontMock('lodash');
jest.dontMock('object-assign');
jest.dontMock('../TagDetails.react.js');

var React = require('react/addons');
var TagDetails = require('../TagDetails.react.js');
var TopicStore = require('../../stores/TopicStore.js');
var TestUtils = React.addons.TestUtils;
var _ = require('lodash');

describe('Component TagDetails', function() {
  var STORE_RESPONSE = {"id":"1751295897__Ben Klock","label":"Ben Klock","volume":5,"type":"topic","sentiment":{"neutral":5,"positive":10,"negative":1},"sentimentScore":50,"burst":20,"days":[{"date":"2014-06-06T00:00:00.000+0000","volume":0},{"date":"2014-06-04T00:00:00.000+0000","volume":3},{"date":"2014-06-09T00:00:00.000+0000","volume":0},{"date":"2014-06-07T00:00:00.000+0000","volume":0},{"date":"2014-06-08T00:00:00.000+0000","volume":1},{"date":"2014-06-03T00:00:00.000+0000","volume":0},{"date":"2014-06-05T00:00:00.000+0000","volume":1}],"pageType":{"blog":0,"facebook":1,"forum":2,"general":0,"image":0,"news":2,"review":0,"twitter":0,"video":0},"queries":[{"id":1751295897,"name":"Berghain","volume":5}],"hashID":"7750010f3eb300da333d63d6aa07e4f6"}
  var DEFAULT_PROPS =
    {hashID: "7750010f3eb300da333d63d6aa07e4f6"};


  TopicStore.getByHash.mockReturnValue(STORE_RESPONSE);
  var tagDetails = TestUtils.renderIntoDocument(
    React.createElement(TagDetails, DEFAULT_PROPS)
  );
  
  it('calls the store with the hashID', function() {
    expect(TopicStore.getByHash.mock.calls.length).toBe(1);
    expect(TopicStore.getByHash.mock.calls[0][0]).toBe(DEFAULT_PROPS.hashID);
  });

  it('displays correct total volume', function() {
    var b = TestUtils.findRenderedDOMComponentWithClass(tagDetails, 'mentions');
    expect(parseInt(b.getDOMNode().textContent)).toBe(STORE_RESPONSE.volume);
  });

  it('displays positive sentiment', function() {
    var b = TestUtils.findRenderedDOMComponentWithClass(tagDetails, 'positive');
    expect(parseInt(b.getDOMNode().textContent)).toBe(STORE_RESPONSE.sentiment.positive);
  });

  it('displays neutral sentiment', function() {
    var b = TestUtils.findRenderedDOMComponentWithClass(tagDetails, 'neutral');
    expect(parseInt(b.getDOMNode().textContent)).toBe(STORE_RESPONSE.sentiment.neutral);
  });
  
  it('displays negative sentiment', function() {
    var b = TestUtils.findRenderedDOMComponentWithClass(tagDetails, 'negative');
    expect(parseInt(b.getDOMNode().textContent)).toBe(STORE_RESPONSE.sentiment.negative);
  });
});
