import {User} from './user';

export interface Post {
  id: number;
  content: string;
  timePosted: Date;
  user: User;
}

export interface FeedResponse {
  feed: Post[] | null;
}

export interface FeedRequestProp {
  userId: number | undefined;
}

export interface CreatePostDto {
  content: string;
  userId: number | undefined;
}
