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

export interface JwtReponse {
  access_token: string | null;
  user: User | null;
  error: any | null;
}
