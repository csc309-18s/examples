const assert = require('assert');
const app = require('../app');
const request = require('request');

describe('Server', () => {

  /* We will need to start up the server to be listening for requests before
   * a test runs, and shut it down after the test is finished.
   */
  before(done => {
    this.port = 3888;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

	// Set default URL in request so that we don't need to replicate the
	// hard coded port number
	this.request = request.defaults({
	  baseUrl: 'http://localhost:3888/'
	});
  });
  
  after(() => {
    this.server.close();
  });


  // Simplest possible test that just confirms that the app exists
  it('should exist', () => {
    assert(app);
  });

  describe('GET/', () => {
    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });


});
