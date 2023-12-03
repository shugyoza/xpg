export const length = {
  /* RFC std is, 
  max 64 chars for local address + 
  255 chars for complete domain, as in:
  local.address@complete.domain */
  email: {
    min: 6, // i.e.: 'a@b.ca'
    max: 254, // Longest email add is 320 and it is silly.
  },
  username: {
    min: 6, // google's enforced minimum length, although its use case (big users pool) very likely won't apply to app with small users pool
    max: 254,
  },
  password: {
    min: 8, // common standard
  },
};

export const valid = {
  // email validation handled by express-validator
  username: /^[a-z0-9][-a-z0-9_]*\$?$/, // username must be forced to lowercase, no one remembers casing & if we lowercased it, might cause confusion in login
  password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
};

export const errorMessages = {
  email: {
    exists: 'Email is required',
    isLength: `Email address must be minimum ${length.username.min} and maximum ${length.username.max} characters long`,
    pattern: 'Email format must be valid, e.g: "ab.cd@email.com"',
  },
  username: {
    exists: 'Username is required',
    isLength: `Username must be minimum ${length.username.min} and maximum ${length.username.max} characters long`,
    pattern:
      'Username can only contain number, dash (-) underscore (-), lowercased letter, (NO CAPITAL letter), e.g: "user_name-2"',
  },
  password: {
    exists: 'Password is required',
    isLength: `Password must have a minimum of ${length.password.min} characters`,
    pattern:
      'Password must contain at least one number, one capital letter, and one lowercase letter, e.g.: paSsword123',
  },
};
