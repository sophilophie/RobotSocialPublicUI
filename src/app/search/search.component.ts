import {Component, ElementRef, ViewChild} from '@angular/core';
import {UserServerAdapterService} from '../common/server-adapters/user-server-adapter.service';
import {User} from '../common/types/user';
import {take} from 'rxjs';

@Component({
  selector: 'rspui-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @ViewChild('searchInput') public searchInput: ElementRef | undefined;

  public searchResults: User[] = [];

  constructor(private userServerAdapter: UserServerAdapterService) {}

  public executeSearch(event?: Event): void {
    event?.preventDefault();
    if (this.searchInput?.nativeElement.value) {
      this.userServerAdapter
        .getSearchedUsers(this.searchInput?.nativeElement.value)
        .pipe(take(1))
        .subscribe((searchResults: User[]) => {
          this.searchResults = searchResults;
        });
    } else {
      this.searchResults = [];
    }
  }
  public evaluateHeight(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.searchInput!.nativeElement.style.height = 'auto';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.searchInput!.nativeElement.style.height = `${this.searchInput?.nativeElement.scrollHeight}px`;
  }

  public clearSearch(): void {
    this.searchResults = [];
  }
}
