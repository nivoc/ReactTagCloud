jest.dontMock('react-router');
jest.dontMock('md5');
jest.dontMock('lodash');
jest.dontMock('./helper/stubRouterContext');
jest.dontMock('../TagCloudTopic.react.js');
// jest.dontMock('../TagCloudTopic.less');

var React = require('react/addons');
var stubRouterContext = require('./helper/stubRouterContext');
var TagCloudTopic = require('../TagCloudTopic.react');
var TestUtils = React.addons.TestUtils;
var _ = require('lodash');

describe('Component TagCloudTopic', function() {
  var DEFAULT_PROPS =
    {label: "testLabel", id: 'testLabelID', score: 22, rank: 2};

  var getRenderedLink = function(props) {
    var TagCloudTopicWithCtx = stubRouterContext(TagCloudTopic, props);
    var tagCloudTopic = TestUtils.renderIntoDocument(
        <TagCloudTopicWithCtx />
        );

    return TestUtils.findRenderedDOMComponentWithTag(
        tagCloudTopic, 'a');
  };

  it('displays the provided label property', function() {
    var a = getRenderedLink(DEFAULT_PROPS);
    expect(a.getDOMNode().textContent).toEqual(DEFAULT_PROPS.label);
  });

  it('has a rank specifc text-style class assigned', function() {
    var EXPECTED_CLASSNAME_REG = "rank" + DEFAULT_PROPS.rank;
    var a = getRenderedLink(DEFAULT_PROPS);
    expect(a.getDOMNode().className).toMatch(EXPECTED_CLASSNAME_REG);
  });

  it('has a positiv(green) style class if sentiment score > 60', function() {
    var a = getRenderedLink(_.merge(DEFAULT_PROPS, {score: 61}));

    expect(a.getDOMNode().className).toMatch("positive");
    expect(a.getDOMNode().className).not.toMatch("negative");
    expect(a.getDOMNode().className).not.toMatch("neutral");
  });


  it('has a neutral(grey) style class if sentiment score 40 =<= 60', function() {
    var a = getRenderedLink(_.merge(DEFAULT_PROPS, {score: 60}));

    expect(a.getDOMNode().className).not.toMatch("positive");
    expect(a.getDOMNode().className).not.toMatch("negative");
    expect(a.getDOMNode().className).toMatch("neutral");

    a = getRenderedLink(_.merge(DEFAULT_PROPS, {score: 40}));

    expect(a.getDOMNode().className).not.toMatch("positive");
    expect(a.getDOMNode().className).not.toMatch("negative");
    expect(a.getDOMNode().className).toMatch("neutral");
  });

  it('has a negativ(red) style class if sentiment score < 40', function() {
    var a = getRenderedLink(_.merge(DEFAULT_PROPS, {score: 39}));

    expect(a.getDOMNode().className).not.toMatch("positive");
    expect(a.getDOMNode().className).toMatch("negative");
    expect(a.getDOMNode().className).not.toMatch("neutral");
  });
});
