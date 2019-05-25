import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAuthenticationComponent } from './social-authentication.component';

describe('SocialAuthenticationComponent', () => {
  let component: SocialAuthenticationComponent;
  let fixture: ComponentFixture<SocialAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
