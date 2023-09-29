import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FriendsComponent} from './friends.component';
import {Store} from '@ngrx/store';
import {UserServerAdapterService} from 'src/app/common/server-adapters/user-server-adapter.service';
import {NotificationService} from 'src/app/common/util/notification.service';
import {of} from 'rxjs';
import {User} from 'src/app/common/types/user';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;
  let mockUserServerAdapter: any, mockStore: any, mockNotificationService: any;

  const mockUser: User = {
    id: 1,
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@test.com',
    username: 'TestUser',
    friendships: [],
    requestedFriends: [],
    requestsReceived: [],
    posts: [],
  };

  const mockRequestor: User = {
    id: 2,
    firstName: 'Test2',
    lastName: 'Test2',
    email: 'test2@test.com',
    username: 'TestUser2',
  };

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('store', ['select', 'dispatch']);
    mockUserServerAdapter = jasmine.createSpyObj('userServerAdapter', ['postFriendship']);
    mockNotificationService = jasmine.createSpyObj('notificationService', ['success', 'error']);
    await TestBed.configureTestingModule({
      declarations: [FriendsComponent],
      providers: [
        {provide: Store, useValue: mockStore},
        {provide: UserServerAdapterService, useValue: mockUserServerAdapter},
        {provide: NotificationService, useValue: mockNotificationService},
      ],
    }).compileComponents();
    mockStore.select.and.returnValue(of(mockUser));
    mockUserServerAdapter.postFriendship.and.returnValue(of());
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should complete friend request', () => {
    component.acceptFriendRequest({id: 1, dateCreated: new Date(), requestee: mockUser, requestor: mockRequestor});
  });
});
