import {FriendRequest} from './friend-request';

export interface User {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  requestedFriends?: FriendRequest[];
  requestsReceived?: FriendRequest[];
  friends?: User[];
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface JwtResponse {
  access_token: string | null;
  user: User | null;
  error?: any | null;
}

export interface JwtDto {
  access_token: string;
}
