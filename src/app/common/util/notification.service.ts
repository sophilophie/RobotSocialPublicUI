import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class NotificationService {
  constructor(private matSnackBar: MatSnackBar) {}

  public success(text: string): void {
    this.matSnackBar.open(text, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'snackbar-success',
    });
  }

  public error(text: string): void {
    this.matSnackBar.open(text, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'snackbar-error',
    });
  }

  public warn(text: string): void {
    this.matSnackBar.open(text, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'snackbar-warn',
    });
  }
}
