/* eslint-env mocha */
/* eslint no-unused-vars: "warn" */
/* eslint no-console: "off" */

const assert = require('assert');
const app = require('../src/app.js');
const db = require('../src/mockdb.js');
const fixtures = require('./fixtures');
const request = require('request');

describe('Server', () => {
  /* We will need to start up the server to be listening for requests before
   * a test runs, and shut it down after the test is finished.
   */
  before((done) => {
    this.port = 3888;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      return done();
    });

    // Set default URL in request so that we don't need to replicate the
    // hard coded port number
    this.request = request.defaults({
      baseUrl: 'http://localhost:3888/',
    });
  });

  after(() => {
    this.server.close();
  });

  // Runs before every test and is used to ensure that the data is in a
  // consistent state.
  beforeEach((done) => {
    db.drop();
    db.add(fixtures.courseZero);
    done();
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
        console.log(db.findAll());
        assert.notEqual(response.statusCode, 404);
        const coursesSize = Object.keys(db.findAll()).length;
        assert.equal(coursesSize, 1, `Expected 1 course, found ${coursesSize}`);
        done();
      });
    });

    it('should receive and store data', (done) => {
      const payload = fixtures.courseEdit;

      this.request.post('/courses', { form: payload }, (error, response) => {
        if (error) {
          done(error);
        }

        const courses = db.findAll();
        console.log(courses);
        console.log(`length:  ${Object.keys(courses).length}`);
        const coursesSize = Object.keys(courses).length;
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
        assert(
          response.body.indexOf('Gonzalez'),
          `'${response.body}' does not include '${'Gonzalez'}'.`,
        );
        done();
      });
    });
  });

  describe('DELETE /courses/:id', () => {
    it('should remove a course from the db object', (done) => {
      this.request.delete('/courses/CSC309', (error, response) => {
        const courses = db.findAll();
        console.log(courses);
        assert(1 === 0, 'placeholder');
      });
      done();
    });
  });
});
