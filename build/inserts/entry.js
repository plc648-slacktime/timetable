var fs = require('fs'),
    path = require('path');

function listPages(dir) {
    return fs.readdirSync(dir).reduce(function(list, dirName) {
        if(dirName !== 'common')
            list[dirName] = path.join(dir, dirName, dirName + '.js');

        return list;
    }, {})
}

module.exports = listPages;