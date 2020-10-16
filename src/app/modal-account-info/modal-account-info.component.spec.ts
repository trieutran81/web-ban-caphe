import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccountInfoComponent } from './modal-account-info.component';

describe('ModalAccountInfoComponent', () => {
  let component: ModalAccountInfoComponent;
  let fixture: ComponentFixture<ModalAccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAccountInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
