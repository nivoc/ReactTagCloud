// jest.dontMock('../../dispatcher/Dispatcher');
jest.dontMock('../TopicStore.js');
// jest.dontMock('events');
// jest.dontMock('../../constants/ActionTypes');
jest.dontMock('object-assign');
jest.dontMock('md5');
jest.dontMock('lodash');
jest.dontMock('keymirror');
jest.dontMock('../../constants/ActionTypes.js')

var TopicStore = require('../TopicStore.js');
var ActionTypes = require('../../constants/ActionTypes.js');
var Dispatcher = require('../../dispatcher/Dispatcher.js');
var md5 = require('md5').digest_s;

var ACTION_RAW_DATA = {action:{actionType:ActionTypes.RECEIVE_RAW_TOPICS,
                               data:{"topics":[{"id":"1751295897__Berlin","label":"Berlin","volume":165,"type":"topic","sentiment":{"negative":3,"neutral":133,"positive":29},"sentimentScore":65,"burst":13,"days":[{"date":"2014-06-06T00:00:00.000+0000","volume":22},{"date":"2014-06-04T00:00:00.000+0000","volume":43},{"date":"2014-06-09T00:00:00.000+0000","volume":0},{"date":"2014-06-07T00:00:00.000+0000","volume":12},{"date":"2014-06-08T00:00:00.000+0000","volume":11},{"date":"2014-06-03T00:00:00.000+0000","volume":39},{"date":"2014-06-05T00:00:00.000+0000","volume":38}],"pageType":{"blog":17,"facebook":56,"forum":22,"general":5,"image":0,"news":26,"review":1,"twitter":35,"video":3},"queries":[{"id":1751295897,"name":"Berghain","volume":165}]        }]}
                        }};

describe('TopicStore', function() {
  var STORE_RESPONSE = {"id":"1751295897__Ben Klock","label":"Ben Klock","volume":5,"type":"topic","sentiment":{"neutral":5,"positive":10,"negative":1},"sentimentScore":50,"burst":20,"days":[{"date":"2014-06-06T00:00:00.000+0000","volume":0},{"date":"2014-06-04T00:00:00.000+0000","volume":3},{"date":"2014-06-09T00:00:00.000+0000","volume":0},{"date":"2014-06-07T00:00:00.000+0000","volume":0},{"date":"2014-06-08T00:00:00.000+0000","volume":1},{"date":"2014-06-03T00:00:00.000+0000","volume":0},{"date":"2014-06-05T00:00:00.000+0000","volume":1}],"pageType":{"blog":0,"facebook":1,"forum":2,"general":0,"image":0,"news":2,"review":0,"twitter":0,"video":0},"queries":[{"id":1751295897,"name":"Berghain","volume":5}],"hashID":"7750010f3eb300da333d63d6aa07e4f6"}

  it('registers at the dispatcher', function() {
    expect(Dispatcher.register.mock.calls.length).toBe(1);
  });

  Dispatcher.register.mock.calls[0][0](ACTION_RAW_DATA);
  var oneTopic = ACTION_RAW_DATA.action.data.topics[0];

  it('returns the correct topic by ID', function() {
      expect(TopicStore.getByID(oneTopic.id)).toBe(oneTopic);
  });

  it('returns the correct topic by hashID', function() {
      expect(TopicStore.getByHash(md5(oneTopic.id))).toBe(oneTopic);
  });
});