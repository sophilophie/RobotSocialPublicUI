import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginDto, JwtReponse, User, JwtDto} from '../types/user';

@Injectable({providedIn: 'root'})
export class UserServerAdapterService {
  constructor(private httpClient: HttpClient) {}

  public postUser(user: User): Observable<JwtReponse> {
    return this.httpClient.post<JwtReponse>('http://localhost:3000/users', user);
  }

  public postSession(loginDto: LoginDto): Observable<JwtReponse> {
    return this.httpClient.post<JwtReponse>('http://localhost:3000/auth/login', loginDto);
  }

  public postRefreshSession(jwtDto: JwtDto): Observable<JwtReponse> {
    return this.httpClient.post<JwtReponse>('http://localhost:3000/auth/refresh', jwtDto);
  }
}
