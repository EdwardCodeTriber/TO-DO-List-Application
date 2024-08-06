const db = require("better-sqlite3")("database.db");

const createTable = () => {
  const sql = `CREATE TABLE Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email VARCHAR(30),
        password VARCHAR(30)
       )`
  const sql2 = `CREATE TABLE Tasks(
    task_id PRIMARY KEY,
    task_description TEXT NOT NULL,
    priority TEXT NOT NULL
   )`
  db.prepare(sql).run();
  db.prepare(sql2).run();
};

createTable();

const insert = ()=>{
  const sql = `
   INSERT INTO Users (name, email, password)
   VALUES(?, ?, ?)
  `
}

insert([Name, username, password])
insert([task_descriptione, priority])
const getUsers = () =>{
  const sql =`
   SELECT * FROM Users 
  `
}

const getTasks = () =>{
  const sql = `
   SELECT * FROM Users WHERE id = ${id}
  `
}