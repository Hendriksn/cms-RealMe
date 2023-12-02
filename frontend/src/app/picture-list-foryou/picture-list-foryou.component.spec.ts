import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureListForyouComponent } from './picture-list-foryou.component';

describe('PictureListForyouComponent', () => {
  let component: PictureListForyouComponent;
  let fixture: ComponentFixture<PictureListForyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureListForyouComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureListForyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
