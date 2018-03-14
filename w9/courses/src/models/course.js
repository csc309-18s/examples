const mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
const Schema = mongoose.Schema;

/**
 * Note that the database was loaded with data from a JSON file into a
 * collection called courses.
 */
const courseSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  when: {
    type: Date,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
}, {
  collection: 'courses',
});


// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
mongoose.connect('mongodb://localhost/coursesdb', (error) => {
  if (error) console.log(error);

  console.log('Database connection successful');

});

// Doc for Mongoose Models: http://mongoosejs.com/docs/models

// Use the schema to create a model
module.exports = mongoose.model('Course', courseSchema);
