import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginDto, JwtResponse, User, JwtDto, UpdateUserDto} from '../types/user';

@Injectable({providedIn: 'root'})
export class UserServerAdapterService {
  constructor(private httpClient: HttpClient) {}

  public postUser(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>('http://localhost:3000/users', user);
  }

  public postSession(loginDto: LoginDto): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>('http://localhost:3000/auth/login', loginDto);
  }

  public postRefreshSession(jwtDto: JwtDto): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>('http://localhost:3000/auth/refresh', jwtDto);
  }

  public putUser(user: UpdateUserDto, id: number): Observable<User> {
    return this.httpClient.put<User>(`http://localhost:3000/users/${id}`, user);
  }

  public getSearchedUsers(searchTerm: string): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:3000/users/search', {params: {searchTerm}});
  }
}
