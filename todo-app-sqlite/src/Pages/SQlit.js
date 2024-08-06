// sqlite.js
import initSqlJs from 'sql.js';

let db;

const initializeDatabase = async () => {
  const SQL = await initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/sql-wasm.wasm`
  });

  // Create a new database
  db = new SQL.Database();

  // Creating a table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      name TEXT,
      password TEXT
    );
  `);
};

const insertUser = (username, name, password) => {
  const stmt = db.prepare(`
    INSERT INTO users (username, name, password)
    VALUES (?, ?, ?);
  `);
  stmt.run([username, name, password]);
  stmt.free();
};

const getUsers = () => {
  const stmt = db.prepare(`
    SELECT * FROM users;
  `);
  const users = [];
  while (stmt.step()) {
    users.push(stmt.getAsObject());
  }
  stmt.free();
  return users;
};

export { initializeDatabase, insertUser, getUsers };
