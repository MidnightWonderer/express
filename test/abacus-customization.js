var httpMocks = require('node-mocks-http');
var express = require('..');

describe('app', function () {
  describe('.use(app)', function () {
    it('should mount the app', function (done) {
      var appA = express();
      var appB = express();
      var appMain = express();
      appB.use(function () {
        return Promise.resolve(42);
      });
      appA.use('/app-b', appB);
      appMain.use('/app-a', appA);
      var mockRequest = httpMocks.createRequest({
        method: 'GET',
        url: '/app-a/app-b'
      });
      var mockResponse = httpMocks.createResponse();
      var returned = appMain(mockRequest, mockResponse);

      if (returned && returned.then) {
        done();
      } else {
        done('did not propagate return value');
      }
    })
  });
});
