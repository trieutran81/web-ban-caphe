import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMemberComponent } from './admin-member.component';

describe('AdminMemberComponent', () => {
  let component: AdminMemberComponent;
  let fixture: ComponentFixture<AdminMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
