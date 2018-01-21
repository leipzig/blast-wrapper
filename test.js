var assert = require('assert'),
    http = require('http');

describe('/', function () {
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