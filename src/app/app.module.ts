import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {authReducer} from './common/state/auth/auth.reducer';
import {AuthEffects} from './common/state/auth/auth.effects';

import {NavbarComponent} from './navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './login/signup/signup.component';
import {HomeComponent} from './route-outlets/home/home.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SidebarLeftComponent} from './sidebar/sidebar-left/sidebar-left.component';
import {SidebarRightComponent} from './sidebar/sidebar-right/sidebar-right.component';
import {FeedEffects} from './common/state/feed/feed.effects';
import {feedReducer} from './common/state/feed/feed.reducer';
import {ProfileComponent} from './route-outlets/profile/profile.component';
import {EditProfileDialogComponent} from './route-outlets/profile/edit-profile-dialog/edit-profile-dialog.component';
import {AuthInterceptor} from './common/util/auth.interceptor';
import {LoadingOverlayComponent} from './common/util/loading-overlay/loading-overlay.component';
import {SearchComponent} from './route-outlets/search/search.component';
import {FriendsComponent} from './route-outlets/friends/friends.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    ProfileComponent,
    EditProfileDialogComponent,
    LoadingOverlayComponent,
    SearchComponent,
    FriendsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({auth: authReducer, feed: feedReducer}),
    EffectsModule.forRoot([AuthEffects, FeedEffects]),
    // Angular Material modules
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatBadgeModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
