import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {HomeComponent} from './home.component';
import {PostServerAdapterService} from '../../common/server-adapters/post-server-adapter.service';
import {of} from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: any, mockPostServerAdapterService: any, mockMoment: any;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('store', ['select']);
    mockPostServerAdapterService = jasmine.createSpyObj('postServerAdapterService', ['postNewPost']);
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {provide: Store, useValue: mockStore},
        {provide: PostServerAdapterService, useValue: mockPostServerAdapterService},
      ],
    }).compileComponents();

    mockStore.select.and.returnValue(of());

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to state changes on init', () => {
    expect(mockStore.select).toHaveBeenCalledTimes(2);
    expect((component as any).subscriptions.length).toBe(2);
  });
});
