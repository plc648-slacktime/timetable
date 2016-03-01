var fs = require('fs'),
    live = fs.readFileSync('./inserts/live.js');

module.exports = function(){
    return live;
};