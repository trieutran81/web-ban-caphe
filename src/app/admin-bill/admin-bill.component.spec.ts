import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBillComponent } from './admin-bill.component';

describe('AdminBillComponent', () => {
  let component: AdminBillComponent;
  let fixture: ComponentFixture<AdminBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
