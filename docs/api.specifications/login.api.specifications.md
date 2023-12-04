# POST /api/v1/account/login

## Request

### Request with valid inputs
<!-- markdownlint-disable -->
```json
// request headers
{
  "Content-Type": "application/json"
}
```
```json
// request body with valid email as login, and valid password
{
  "login": "username444@email.com",
  "password": "Password123"
}
```
OR
```json
// request body with valid username as login, and valid password
{
  "login": "username444",
  "password": "Password123"
}
```

## Request with invalid inputs
```json
// request body with invalid login string that is too short
{
  "login": "use",
  "password": "Password123"	
}
```

## Response

### Success: "`200 OK`"
```json
// response body
{
  "id": 60,
  "email": "username444@email.com",
  "username": "username444-email-com",
  "createdAt": "2023-11-24T18:34:07.727Z",
  "updatedAt": "2023-11-24T18:34:07.727Z"
}
```

### Fail: "`401 Unauthorized`"
This is the response for any http request with body that contains:
- Login string that does not exist in the database, neither as username nor email; and / or
- Password, which hash does not match with the hashed password stored in the database
```json
// response
Unauthorized
```

### Fail: "`400 Bad Request`"
<!-- textlint-disable -->
- Http request body contains invalid input(s), that might be due to Front-end did not validate properly on User's inputs
<!-- textlint-enable -->
```json
// response body
{
  "errors": [
    {
      "type": "field",
      "value": "use",
      "msg": "Email address must be minimum 6 and maximum 254 characters long",
      "path": "login",
      "location": "body"
    },
    {
      "type": "field",
      "value": "use",
      "msg": "Email format must be valid, e.g: \"ab.cd@email.com\"",
      "path": "login",
      "location": "body"
    },
    {
      "type": "field",
      "value": "use",
      "msg": "Username must be minimum 6 and maximum 254 characters long",
      "path": "login",
      "location": "body"
    }
  ]
}
```
<!-- markdownlint-enable -->