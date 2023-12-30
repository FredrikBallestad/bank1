const sqlite3 = require('sqlite3').verbose();

//const db = new sqlite3.Database('../../profiles.db', sqlite3.OPEN_READWRITE, (err) => {
const db = new sqlite3.Database('../../test.db', sqlite3.OPEN_READWRITE, (err) => {
if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database at');
  }
});

module.exports = db;