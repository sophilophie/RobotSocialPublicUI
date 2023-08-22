import {User} from './user';

export interface FriendRequest {
  id: number;
  dateCreated: Date;
  requestor: User;
  requestee: User;
}
