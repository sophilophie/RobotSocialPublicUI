import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class NotificationService {
  constructor(private matSnackBar: MatSnackBar) {}

  success(text: string) {
    this.matSnackBar.open(text, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'snackbar-success',
    });
  }

  error(text: string) {
    this.matSnackBar.open(text, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'snackbar-error',
    });
  }

  warn(text: string) {
    this.matSnackBar.open(text, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'snackbar-warn',
    });
  }
}
