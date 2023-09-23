import {TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

import {ProfileComponent} from './profile.component';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';

describe('ProfileComponent', () => {
  let component: any;
  let mockStore: any, mockDialog: any;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'select']);
    mockDialog = jasmine.createSpyObj('dialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {provide: Store, useValue: mockStore},
        {provide: MatDialog, useValue: mockDialog},
      ],
    }).compileComponents();

    mockStore.select.and.returnValue(of());
    component = TestBed.createComponent(ProfileComponent).componentInstance;
  });

  it('should be an instance of ProfileComponent', () => {
    expect(component instanceof ProfileComponent).toBe(true);
  });

  it('should subscribe to state changes on init', () => {
    component.ngOnInit();
    expect(mockStore.select).toHaveBeenCalledTimes(2);
    expect((component as any).subscriptions.length).toBe(2);
  });

  it('should open a dialog when edit is clicked', () => {
    component.openEditDialog();
    expect(mockDialog.open).toHaveBeenCalled();
  });
});
