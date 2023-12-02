## POST /api/v1/account/register

### Request 

#### Request with valid inputs
```
// request headers
{
    "Content-Type": "application/json"
}
```
```
// request body
{
	"email": "username444@email.com",
	"password": "Password123"
}
```

### Request with invalid inputs
```
// request body
{
	"email": "username444",
	"password": "Password123"	
}
```

### Response

#### Success: "`201 Created`"
```
// response body
{
	"id": 60,
	"email": "username444@email.com",
	"username": "username444-email-com",
	"createdAt": "2023-11-24T18:34:07.727Z"
}
```

#### Fail: "`409 Conflict`"
- Email has already been registered
```
// response body
{
	"length": 222,
	"name": "error",
	"severity": "ERROR",
	"code": "23505",
	"detail": "Key (email)=(username444@email.com) already exists.",
	"schema": "public",
	"table": "Accounts",
	"constraint": "Accounts_email_key",
	"file": "nbtinsert.c",
	"line": "671",
	"routine": "_bt_check_unique",
	"query": {
		"text": "INSERT INTO \"Accounts\" (email, username, role, password) VALUES($1, $2, $3, $4) RETURNING *;",
		"values": [
			"username444@email.com",
			"username444-email-com",
			"user",
			"$2b$10$smBwMyLWixaPrpTaCjG8O.FasIo2oD62o9dHF4zUz36HbnPWmiOri"
		]
	}
}
```

#### Fail: "`400 Bad Request`"
<!-- textlint-disable -->
- Front-end sent form with some invalid inputs
P.S. Front-end is correct as adjective, Front end is correct as a noun, Frontend has never made it into dictionaries
<!-- textlint-enable -->
```
// response body
{
	"errors": [
		{
			"type": "field",
			"value": "username444",
			"msg": "Email format must be valid, e.g: \"ab.cd@email.com\"",
			"path": "email",
			"location": "body"
		},
		{
			"type": "field",
			"value": "username444",
			"msg": "Email format must be valid, e.g: \"ab.cd@email.com\"",
			"path": "email",
			"location": "body"
		}
	]
}
```