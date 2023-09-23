import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingOverlayService {
  public isLoading$ = new BehaviorSubject<boolean>(false);
}
