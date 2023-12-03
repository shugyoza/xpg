import { check } from 'express-validator';

import { length, valid, errorMessages } from './constants';

const checkPassword = check('password')
  .exists({ checkFalsy: true })
  .withMessage(errorMessages.password.exists)
  .isLength(length.password)
  .withMessage(errorMessages.password.isLength)
  .matches(valid.password)
  .withMessage(errorMessages.password.pattern);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkUsername = check('username')
  .exists({ checkFalsy: true })
  .withMessage(`username: ${errorMessages.username.exists}`)
  .isLength(length.username)
  .withMessage(errorMessages.username.isLength)
  .matches(valid.username)
  .withMessage(errorMessages.username.pattern);

export const loginValidators = [
  check('login') // check for error as email
    .exists({ checkFalsy: true })
    .withMessage(errorMessages.email.exists)
    .isLength(length.email)
    .withMessage(errorMessages.email.isLength)
    .isEmail()
    .withMessage(errorMessages.email.pattern),
  check('login') // check for error as username
    .isLength(length.username)
    .withMessage(errorMessages.username.isLength)
    .matches(valid.username)
    .withMessage(errorMessages.username.pattern),
  checkPassword,
];

export const registerValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage(`email: ${errorMessages.email.exists}`)
    .isLength(length.email)
    .withMessage(
      `Email address must be minimum ${length.email.min} and maximum ${length.email.max} characters long`
    )
    .isEmail()
    .withMessage(errorMessages.email.pattern),
  checkPassword,
];
