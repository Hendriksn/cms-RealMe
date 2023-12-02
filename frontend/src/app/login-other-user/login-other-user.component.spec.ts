import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOtherUserComponent } from './login-other-user.component';

describe('LoginOtherUserComponent', () => {
  let component: LoginOtherUserComponent;
  let fixture: ComponentFixture<LoginOtherUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginOtherUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
