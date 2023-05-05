import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('store', ['select']);
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{provide: Store, useValue: mockStore}],
    }).compileComponents();

    mockStore.select.and.returnValue({
      subscribe: () => ({
        unsubscribe: () => {
          return;
        },
      }),
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to auth state changes on init', () => {
    expect(mockStore.select).toHaveBeenCalled();
    expect((component as any).subscription).toBeDefined();
  });
});
