import {Post} from './post';

export interface User {
  id?: number;
  dateCreated?: Date;
  dateUpdated?: Date;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  requestedFriends?: FriendRequest[];
  requestsReceived?: FriendRequest[];
  friendships?: Friendship[];
  posts?: Post[];
}

export interface Friendship {
  id?: number;
  dateCreated?: Date;
  friend: User;
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

export interface FriendRequest {
  id: number;
  dateCreated: Date;
  requestor: User;
  requestee: User;
}

export interface FriendRequestDto {
  requestorId: number;
  requesteeId: number;
}
