import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundPicturesComponent } from './background-pictures.component';

describe('BackgroundPicturesComponent', () => {
  let component: BackgroundPicturesComponent;
  let fixture: ComponentFixture<BackgroundPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundPicturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
