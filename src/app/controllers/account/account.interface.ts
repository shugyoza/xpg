export class RegisterDTO {
  readonly username!: string;
  readonly email!: string;
  readonly password!: string;
  readonly role!: string;
}

export class AccountDTO extends RegisterDTO {
  readonly id!: number;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export class LoginDTO {
  readonly login!: string;
  readonly password!: string;
}
