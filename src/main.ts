import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connection } from './app/db/config';
import { initializeDB } from './app/db';
import { account } from './app/routes/account.route';

dotenv.config();
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = express();
const corsOptions = {
  origin: `http://localhost:${port}`,
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/v1/account', account);

server.get('/', (_: Request, response: Response) => {
  response.status(200).json({
    hostname,
    port,
    message: 'success',
  });
});

export const db = initialize();

function initialize() {
  const db = initializeDB();

  server.listen(port, () =>
    console.log(`Server is listening at http://${hostname}:${port}`)
  );

  return db;
}
