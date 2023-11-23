import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { db } from './app/database/models';
import { errorRequestHandler } from './app/utils/error';
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

server.use(errorRequestHandler);

(async () => {
  try {
    await db.sequelize.sync();
    server.listen(port, () => {
      console.log(
        `Database connected, server is listening at http://${hostname}:${port}`
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
