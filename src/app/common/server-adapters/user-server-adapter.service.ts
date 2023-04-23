import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginDto, Token, User } from "../types/user";

@Injectable({ providedIn: 'root' })
export class UserServerAdapterService {
  constructor(private httpClient: HttpClient) {}

  postUser(user: User): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/users', user);
  }

  postSession(loginDto: LoginDto): Observable<Token> {
    return this.httpClient.post<Token>('http://localhost:3000/auth/login', loginDto);
  }
}