import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormeComponent } from './profile-forme.component';

describe('ProfileFormeComponent', () => {
  let component: ProfileFormeComponent;
  let fixture: ComponentFixture<ProfileFormeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFormeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
