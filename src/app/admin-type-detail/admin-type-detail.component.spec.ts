import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypeDetailComponent } from './admin-type-detail.component';

describe('AdminTypeDetailComponent', () => {
  let component: AdminTypeDetailComponent;
  let fixture: ComponentFixture<AdminTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
