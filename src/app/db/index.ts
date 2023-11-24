import { connection } from './config';

const initializationOptions = {};
const pgp = require('pg-promise')(initializationOptions);

export const initializeDB = () => {
  const db = pgp(connection.url);
  console.log('Connected to database');

  return db;
};
