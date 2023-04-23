import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../types/user";

@Injectable({ providedIn: 'root' })
export class UserServerAdapterService {
  constructor(private httpClient: HttpClient) {}

  postUser(user: User) {
    return this.httpClient.post('http://localhost:3000/users', user);
  }
}