const assert = require('assert');
const methods = require('../app.js');
const app = methods.app;
const db = methods.db;
const fixtures = require('./fixtures');
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

  describe('GET /', () => {
    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });


  describe('POST /courses', () => {

    it('should not return 404', (done) => {
      this.request.post('/courses', (error, response) => {
        if (error) { 
          done(error); 
        }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });
    
    it('should receive and store data', (done) => {
      let payload = fixtures.validCourse;

      this.request.post('/courses', { form: payload }, (error, response) => {
        if (error) { 
          done(error); 
        }

        let courses = db.findAll();
        console.log(courses);
        console.log('length: ' + Object.keys(courses).length);
        let coursesSize = Object.keys(courses).length;

        assert.equal(coursesSize, 2, `Expected 2 courses, found ${coursesSize}`);

        done();
      });
    });
  });
  
  describe('GET /courses/:id/edit', () => {
    it('should not return 404', (done) => {
      this.request.get('/courses/CSC309/edit', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    }); 
    
    it('should return a page that has the info about a course in the form', (done) => {
      this.request.get('/courses/CSC309/edit', (error, response) => {
        if (error) { done(error); }
        assert(response.body.indexOf('Gonzalez'),
               `"${response.body}" does not include "${'Gonzalez'}".`);
        done();
      }); 
    });
  });
  
});
