import {User} from './user';

export interface Post {
  id: string;
  content: string;
  dateCreated: Date;
  user: User;
}

export interface FeedResponse {
  feed: Post[] | null;
}

export interface FeedRequestProp {
  userId: string | undefined;
}

export interface CreatePostDto {
  content: string;
  userId: string | undefined;
}

export interface PostsResponse {
  posts: Post[];
}
