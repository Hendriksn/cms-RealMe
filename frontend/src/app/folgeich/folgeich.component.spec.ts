import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolgeichComponent } from './folgeich.component';

describe('FolgeichComponent', () => {
  let component: FolgeichComponent;
  let fixture: ComponentFixture<FolgeichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolgeichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolgeichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
