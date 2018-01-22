var assert = require('assert'),
    http = require('http');

var server = require('./server');

//http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
describe('/', function () {
  //before(function () {
  //  server.listen(8080);
  //});

  after(function () {
    server.close();
  });

  it('should return 400', function (done) {
    http.get('http://localhost:8080/?name=mysequence', function (res) {
      assert.equal(400, res.statusCode);
      done();
    });
  });

  it('should say "No seq argument"', function (done) {
    http.get('http://localhost:8080/?name=mysequence', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal('No seq argument\n', data);
        done();
      });
    });
  });
});