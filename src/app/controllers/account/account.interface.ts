export class AccountCredential {
  readonly username!: string;
  readonly email!: string;
  readonly role!: string;
}

export class RegisterDTO extends AccountCredential {
  readonly password!: string;
}

export class DeserializedAccount extends AccountCredential {
  readonly id!: number;
}

export class AccountDTO extends DeserializedAccount {
  readonly password!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export class LoginDTO {
  readonly login!: string;
  readonly password!: string;
}
