import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountInfoComponent } from './admin-account-info.component';

describe('AdminAccountInfoComponent', () => {
  let component: AdminAccountInfoComponent;
  let fixture: ComponentFixture<AdminAccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccountInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
