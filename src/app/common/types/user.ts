import {Post} from './post';

export interface User {
  id?: string;
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
  id?: string;
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
  id: string;
  dateCreated: Date;
  requestor: User;
  requestee: User;
}

export interface FriendRequestDto {
  requestorId: string;
  requesteeId: string;
}
