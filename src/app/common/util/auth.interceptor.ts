import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}
