import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypeAddComponent } from './admin-type-add.component';

describe('AdminTypeAddComponent', () => {
  let component: AdminTypeAddComponent;
  let fixture: ComponentFixture<AdminTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
