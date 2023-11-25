import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';

import { initializeDB } from './app/db';
import { account } from './app/routes/account.route';
import { sessionLog } from './app/shared/utils/session-log';
import { initializePassport } from './app/controllers/auth/passport.config';

dotenv.config();
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

initializePassport(passport);

const server = express();
const corsOptions = {
  origin: `http://localhost:${port}`,
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    name: 'sessionId',
    rolling: true, // default set to false. true sets expiration to maxAge
    cookie: {
      httpOnly: true, // default already set to true
      maxAge: 1 /*hr*/ * 60 /*mins*/ * 60 /*secs*/ * 1000 /*ms*/,
    },
  })
); // initialize express session
server.use(passport.initialize()); // init passport on every route call
server.use(passport.session()); // allow passport to use 'express-session'

server.use('/api/v1/account', account);

server.get('/', (_: Request, response: Response) => {
  response.status(200).json({
    hostname,
    port,
    message: 'success',
  });
});

server.use(sessionLog);

export const db = initializeDB();

server.listen(port, () =>
  console.log(`Server is listening at http://${hostname}:${port}`)
);
