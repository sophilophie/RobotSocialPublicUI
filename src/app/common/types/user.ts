import {FriendRequest} from './friend-request';
import {Post} from './post';

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
  posts: Post[];
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface JwtResponse {
  access_token: string;
  user: User;
  error?: any;
}

export interface JwtDto {
  access_token: string;
}

export interface UpdateUserDto {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}
