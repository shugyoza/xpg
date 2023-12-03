import express from 'express';
import passport from 'passport';

import {
  findAll,
  register,
  evaluateLoginErrors,
  login,
  logout,
} from '../controllers/account/account.controller';
import { registerValidators, loginValidators } from '../controllers/validators';

export const account = express.Router();

account.get('/', findAll);
account.post('/register', registerValidators, register);

const options = {
  successMessage: 'success',
  failureMessage: 'fail',
};
account.post(
  '/login',
  loginValidators,
  evaluateLoginErrors,
  passport.authenticate('local', options),
  login
);
account.post('/logout', logout);
