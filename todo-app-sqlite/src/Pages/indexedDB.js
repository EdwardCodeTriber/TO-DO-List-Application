import { openDB } from 'idb';

const DB_NAME = 'MyAppDB';
const USER_STORE_NAME = 'users';
const TASK_STORE_NAME = 'tasks';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(USER_STORE_NAME)) {
        db.createObjectStore(USER_STORE_NAME, { keyPath: 'username' });
      }
      if (!db.objectStoreNames.contains(TASK_STORE_NAME)) {
        db.createObjectStore(TASK_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addUser = async (user) => {
  const db = await initDB();
  return db.put(USER_STORE_NAME, user);
};

export const getUser = async (username) => {
  const db = await initDB();
  return db.get(USER_STORE_NAME, username);
};

export const addTask = async (task) => {
  const db = await initDB();
  return db.put(TASK_STORE_NAME, task);
};

export const getTasks = async () => {
  const db = await initDB();
  return db.getAll(TASK_STORE_NAME);
};

export const updateTask = async (task) => {
  const db = await initDB();
  return db.put(TASK_STORE_NAME, task);
};

export const deleteTask = async (id) => {
  const db = await initDB();
  return db.delete(TASK_STORE_NAME, id);
};
