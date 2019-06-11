import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfirmationComponent } from './admin-confirmation.component';

describe('AdminConfirmationComponent', () => {
  let component: AdminConfirmationComponent;
  let fixture: ComponentFixture<AdminConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
