const db = (() => {
  let database = {
    CSC309: {
      id: 'CSC309',
      when: new Date(),
      what: 'Programming on the Web',
      who: 'Gonzalez',
    },
  };

  return { // public interface to the DB layer

    findAll() {
      return database;
    },
    findOne(i) {
      return database[i];
    },
    add(r) {
      database[r.id] = r;
    },
    remove(i) {
      delete database[i];
    },
    drop() {
      database = {};
    },
  };
})();

module.exports = db;
