import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthState } from '../common/state/auth/auth.reducer';

@Component({
  selector: 'rspui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isLoggedIn$: Observable<boolean> = this.store.select((state: any) => state.auth)
    .pipe(map((state: AuthState) => state.isLoggedIn));

  constructor(private store: Store) {}

}
