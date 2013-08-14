var http = require('http');
var url = require('url');

//load bl2seq config
var baseDir = process.cwd();
var config = require(baseDir + '/config.json');

//this is a node.js wrapper for bl2seq

//boilerplate code from http://nodejs.org/
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	var queryData = url.parse(req.url,true).query;
	if(queryData.seq){
	    if(!queryData.defline){
		queryData.defline="sequence";
	    }
	    blastSeq(config,'>'+queryData.defline+'\\n'+queryData.seq+'\\n',res);
	}else{
	    res.end("No seq argument\n");
	}
}).listen(8080);

//call bl2seq and print default format straight to browser
function blastSeq(config,queryPath,browser){
    //config.executable is the path to bl2seq
    //though it could be blastall with some tweaks
    //build the blast command and evaluate in bash to allow
    //for process substitution so we are not creating temp files
    var blastCmd="/bin/bash -c '"+config.executable+" -i <(echo -e \""+queryPath+"\")";
    for (var i = 0; i < config.params.length; i++) {
	blastCmd += " "+config.params[i].argument+" "+config.params[i].value;
    }
    blastCmd += "'"

    //http://nodejs.org/api/child_process.html
    var childProcess = require('child_process');
    blast = childProcess.exec(blastCmd, function (error, stdout, stderr) {
	if (error) {
	    browser.write(error.stack);
	    browser.write(stderr)
	}else{
	    browser.write(stdout);
	}
	browser.end();
    });
}