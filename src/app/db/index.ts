import { connection } from './config';

const initializationOptions = {};
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pgp = require('pg-promise')(initializationOptions);

export const initializeDB = () => {
  const db = pgp(connection.url);
  console.log('Connected to database');

  return db;
};
