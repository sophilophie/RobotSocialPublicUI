import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {SearchComponent} from './search.component';
import {UserServerAdapterService} from '../../common/server-adapters/user-server-adapter.service';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {NotificationService} from 'src/app/common/util/notification.service';
import {User} from 'src/app/common/types/user';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockUserServerAdapter: any, mockStore: any, mockNotificationService: any;

  const mockUser: User = {
    id: 1,
    firstName: 'Test',
    lastName:'Test',
    email: 'test@test.com',
    username: 'TestUser',
    friendships: [],
    requestedFriends: [],
    requestsReceived: [],
    posts: []
  };

  beforeEach(async () => {
    mockUserServerAdapter = jasmine.createSpyObj('userServerAdapter', ['getSearchedUsers', 'postFriendRequest']);
    mockStore = jasmine.createSpyObj('store', ['select', 'dispatch']);
    mockNotificationService = jasmine.createSpyObj('notificationService', ['success', 'error']);
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {provide: UserServerAdapterService, useValue: mockUserServerAdapter},
        {provide: Store, useValue: mockStore},
        {provide: NotificationService, useValue: mockNotificationService},
      ],
    }).compileComponents();

    mockUserServerAdapter.getSearchedUsers.and.returnValue(of());
    mockUserServerAdapter.postFriendRequest.and.returnValue(of());
    mockStore.select.and.returnValue(of({user: mockUser}));

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize to the correct type', () => {
    expect(component instanceof SearchComponent).toBe(true);
  });

  it('should execute the search', () => {
    (component.searchInput as any) = {nativeElement: {value: 'test'}};
    component.executeSearch();
    expect(mockUserServerAdapter.getSearchedUsers).toHaveBeenCalledWith('test');
  });

  it('should send friend request', () => {
    component.sendFriendRequest(1);
    expect(mockUserServerAdapter.postFriendRequest).toHaveBeenCalled();
  });
});
