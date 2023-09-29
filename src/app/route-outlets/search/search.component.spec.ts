import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {SearchComponent} from './search.component';
import {UserServerAdapterService} from '../common/server-adapters/user-server-adapter.service';
import {of} from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockUserServerAdapter: any;

  beforeEach(async () => {
    mockUserServerAdapter = jasmine.createSpyObj('userServerAdapter', ['getSearchedUsers']);
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{provide: UserServerAdapterService, useValue: mockUserServerAdapter}],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockUserServerAdapter.getSearchedUsers.and.returnValue(of());
  });

  it('should initialize to the correct type', () => {
    expect(component instanceof SearchComponent).toBe(true);
  });

  it('should execute the search', () => {
    (component.searchInput as any) = {nativeElement: {value: 'test'}};
    component.executeSearch();
    expect(mockUserServerAdapter.getSearchedUsers).toHaveBeenCalledWith('test');
  });
});
