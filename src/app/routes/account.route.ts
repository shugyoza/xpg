import express from 'express';
import passport from 'passport';

import {
  findAll,
  register,
  login,
  logout,
} from '../controllers/account/account.controller';

export const account = express.Router();

account.get('/', findAll);

const options = {
  successMessage: 'login success',
  failureMessage: 'login fail',
};
account.post('/login', passport.authenticate('local', options), login);
account.post('/register', register);
account.post('/logout', logout);
