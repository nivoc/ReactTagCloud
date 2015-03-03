var ReactTools = require('react-tools');
module.exports = {
  process: function(src, file) {
    if(!file.match(/(react|jsx-test)\.js$/)) {
		return src;
	}

    return ReactTools.transform(src);
  }
};
