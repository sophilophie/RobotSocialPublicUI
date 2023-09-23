import {Component, OnInit} from '@angular/core';
import {LoadingOverlayService} from './loading-overlay.service';

@Component({
  selector: 'rspui-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
})
export class LoadingOverlayComponent implements OnInit {
  constructor(private loadingOverlayService: LoadingOverlayService) {}

  public isLoading = this.loadingOverlayService.isLoading$.getValue();

  public ngOnInit(): void {
    this.loadingOverlayService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
