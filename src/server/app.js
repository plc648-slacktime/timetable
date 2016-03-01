import express from 'express';
import path from 'path';

express.static.mime.define({'text/css': ['less']});

var app = express();

app.use(express.static(path.resolve('../dist/client')));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});