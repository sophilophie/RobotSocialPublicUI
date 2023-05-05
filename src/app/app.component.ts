import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as AuthActions from './common/state/auth/auth.actions';

@Component({
  selector: 'rspui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.store.dispatch(AuthActions.refreshRequest({access_token: accessToken}));
    }
  }
}
