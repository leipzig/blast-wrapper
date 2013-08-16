var http = require('http');
var url = require('url');
var qs = require('querystring');
//load bl2seq config
var baseDir = process.cwd();
var config = require(baseDir + '/config.json');

//this is a node.js wrapper for bl2seq
//boilerplate code from http://nodejs.org/
//and http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
http.createServer(function(req, res) {

    var queryData = '';
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function(data) {
            body += data;
            if (body.length > 1e6) {
                queryData = "";
                res.writeHead(413, {
                    'Content-Type': 'text/plain'
                }).end();
                req.connection.destroy();
            }
        });
        req.on('end', function() {
            queryData = qs.parse(body);
            validate(queryData, res);
        });
    } else {
        queryData = url.parse(req.url, true).query;
        validate(queryData, res);
    }
}).listen(config.port);

//the sequence is required, the name isn't

function validate(queryData, res) {
    if (queryData.seq) {
        if (!queryData.name) {
            queryData.name = "sequence";
        }
        var re = /^[A-Za-z]+$/;
        if (typeof queryData.seq == 'string' && queryData.seq.match(re)) {
            blastSeq('>' + queryData.name + '\\n' + queryData.seq + '\\n', res);
        } else {
            contentError("Invalid sequence\n", res);
        }
    } else {
        contentError("No seq argument\n", res);
    }
}

function contentError(errorstr, res) {
    res.writeHead(400, {
        'Content-Type': 'text/plain'
    });
    res.end(errorstr);
}

//call blast and print default format straight to browser


function blastSeq(queryPath, res) {
    //config.executable is the path to bl2seq
    //though it could be blastall with some tweaks
    //build the blast command and evaluate in bash to allow
    //for process substitution so we are not creating temp files
    var blastCmd = "/bin/bash -c '" + config.executable + " " + config.queryarg + " <(echo -e \"" + queryPath + "\")";
    for (var i = 0; i < config.params.length; i++) {
        blastCmd += " " + config.params[i].argument + " " + config.params[i].value;
    }
    blastCmd += "'"

    //http://nodejs.org/api/child_process.html
    var childProcess = require('child_process');
    blast = childProcess.exec(blastCmd, function(error, stdout, stderr) {
        if (error) {
            contentError(error.stack, res);
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.write(error.stack);
            res.end(stderr)
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(stdout);
        }
    });
}
