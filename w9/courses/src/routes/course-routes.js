/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: "off" */


const Course = require('../models/course');

exports.findAll = function findCourse(req, res) {
  console.log('findAll');
  Course.find({}, (err, allCourses) => {
    if (err) throw err;

    if (allCourses) {
      res.render('courses/index', { courses: allCourses });
    } else {
      res.render('courses/index', { courses: [{ id: '', title: '', instructor: '' }] });
    }
  });
};

exports.findOne = function findCourse(req, res) {
  console.log('findOne');
  console.log('req.params');
  Course.findOne({ id: req.params.id }, (err, aCourse) => {
    res.render('courses/edit', { course: aCourse });
  });
};

exports.addOne = function addCourse(req, res) {
  console.log('addOne');
  console.log(req.body);
  const newCourse = new Course(req.body);
  newCourse.save((err) => {
    if (err) throw err;

    res.redirect('/courses');
  });
};

exports.update = function updateCourse(req, res) {
  console.log('update');
  console.log(req.body);

  Course.findOne({ id: req.params.id }, (err, aCourse) => {
    if (err) throw err;

    aCourse.instructor = req.body.instructor;
    aCourse.title = req.body.title;
    aCourse.save((err1) => {
      if (err1) throw err1;

      res.redirect('/courses');
    });
  });
};

exports.delete = function deleteCourse(req, res) {
  console.log('update');
  console.log(req.params.id);

  Course.findOneAndRemove({ id: req.params.id }, (err) => {
    if (err) throw err;

    res.redirect('/courses');
  });
};
