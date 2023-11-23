import { Sequelize } from 'sequelize';

// es import pops this error: is not a module.ts(2306)
const configs = require('../config/database');

const env = process.env.NODE_ENV || 'development';
export const dbConfig = (configs as any)[env];
const { dialect, username, password, database, host, port } = dbConfig;

/* does not work locally */
// export const pgURL = `postgresql://${username}:${password}@${hostname}:${port}/${database}`;
export const pgpURL = `${dialect}://${username}:${password}@${host}:${port}/${database}`;

export const db = {
  sequelize: ((configs: any) => {
    if (configs.url) {
      console.log('Using config url for database connection');

      return new Sequelize(configs.url, {});
    } else {
      console.log('Using config credentials for database connection');

      return new Sequelize(database, username, password, {});
    }
  })(configs),
};
