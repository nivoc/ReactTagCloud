var _ = require("lodash");

function  throwIf(val, msg){
  if (val){
      throw Error(msg||val);
  }
}

function like(data, duck) {
  var name;

  throwIf(!_.isPlainObject(data) || !_.isPlainObject(duck), "Only Objects supported");


  for (name in duck) {
      if (duck.hasOwnProperty(name)) {
          if (data.hasOwnProperty(name) === false || typeof data[name] !== typeof duck[name]) {
              return false;
          }

          if (_.isPlainObject(data[name]) && like(data[name], duck[name]) === false) {
              return false;
          }
      }
  }

  return true;
}

module.exports = {
  throwIf: throwIf,
  like: like,
  notLike: function() { return !like.apply(this,arguments) }
}