var fs = require('fs'),
	path = require('path');

function listPages(dir) {
	return fs.readdirSync(dir).reduce(function(list, dirName) {
		if(dirName !== 'common' && dirName !== 'vendor')
			list[dirName] = '.' + path.sep + path.join(dir, dirName, dirName + '.js');

		return list;
	}, {})
}

module.exports = listPages;