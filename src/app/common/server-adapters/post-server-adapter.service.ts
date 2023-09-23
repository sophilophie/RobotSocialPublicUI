import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map, tap} from 'rxjs';
import {CreatePostDto, FeedResponse, Post, PostsResponse} from '../types/post';
import {NotificationService} from '../util/notification.service';

@Injectable({providedIn: 'root'})
export class PostServerAdapterService {
  constructor(private httpClient: HttpClient, private notificationService: NotificationService) {}

  public getNewsFeed(userId: number | undefined): Observable<FeedResponse> {
    return this.httpClient.get<Post[]>(`http://localhost:3000/posts/feed/${userId}`).pipe(
      map((posts: Post[]): FeedResponse => {
        return {feed: posts};
      }),
    );
  }

  public getUserPosts(userId: number | undefined): Observable<PostsResponse> {
    return this.httpClient.get<Post[]>('http://localhost:3000/posts/' + userId).pipe(
      map((posts: Post[]): PostsResponse => {
        return {posts};
      }),
    );
  }

  public postNewPost(postDto: CreatePostDto): Observable<Post> {
    return this.httpClient
      .post<Post>(`http://localhost:3000/posts`, postDto)
      .pipe(tap(() => this.notificationService.success('Post Success!')));
  }
}
