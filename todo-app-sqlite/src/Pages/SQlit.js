// sqlite.js
import initSqlJs from 'sql.js';

let db;

const initializeDatabase = async () => {
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });

  // Create a new database
  db = new SQL.Database();

  // Create a table
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
  if (!db) throw new Error('Database is not initialized');
  const stmt = db.prepare(`
    INSERT INTO users (username, name, password)
    VALUES (?, ?, ?);
  `);
  stmt.run([username, name, password]);
  stmt.free();
};

const authenticateUser = (username, password) => {
  if (!db) throw new Error('Database is not initialized');
  const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
  stmt.bind([username]);

  let user = null;
  if (stmt.step()) {
    const userData = stmt.getAsObject();
    if (userData.password === password) {
      user = userData;
    }
  }
  stmt.free();
  return user;
};

const getUsers = () => {
  if (!db) throw new Error('Database is not initialized');
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

export { initializeDatabase, insertUser, authenticateUser, getUsers };
