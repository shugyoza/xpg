import express from 'express';
import passport from 'passport';

import {
  findAll,
  register,
  login,
  logout,
} from '../controllers/account/account.controller';
import { validators } from '../controllers/validators';

export const account = express.Router();

account.get('/', findAll);
account.post('/register', validators.register, register);

const options = {
  successMessage: 'success',
  failureMessage: 'fail',
};
account.post(
  '/login',
  validators.login,
  passport.authenticate('local', options),
  login
);
account.post('/logout', logout);
