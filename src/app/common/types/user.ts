export interface User {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface Token {
  access_token: string;
}
