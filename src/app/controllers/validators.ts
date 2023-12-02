import { check } from 'express-validator';

import { length, valid, errorMessages } from './constants';

const checkPassword = check('password')
  .exists({ checkFalsy: true })
  .withMessage(`password: ${errorMessages.username.required}`)
  .isLength(length.password)
  .withMessage(errorMessages.password.minlength)
  .matches(valid.password)
  .withMessage(errorMessages.password.pattern);

const checkUsername = check('username')
  .exists({ checkFalsy: true })
  .withMessage(`username: ${errorMessages.username.required}`)
  .isLength(length.username)
  .withMessage(
    `Email address must be minimum ${length.username.min} and maximum ${length.username.max} characters long`
  )
  .matches(valid.username)
  .withMessage(errorMessages.username.pattern);

const login = [
  check('login')
    .exists({ checkFalsy: true })
    .withMessage(`email: ${errorMessages.email.required}`)
    .isLength(length.email)
    .withMessage(
      `login must be minimum ${length.email.min} and maximum ${length.email.max} characters long`
    ),
  checkPassword,
];

const register = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage(`email: ${errorMessages.email.required}`)
    .isLength(length.email)
    .withMessage(
      `Email address must be minimum ${length.email.min} and maximum ${length.email.max} characters long`
    )
    .isEmail()
    .withMessage(errorMessages.email.pattern)
    .matches(valid.email)
    .withMessage(errorMessages.email.pattern),
  checkPassword,
];

export const validators = {
  login,
  register,
};
