import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuTimelineComponent } from './cpu-timeline.component';

describe('CpuTimelineComponent', () => {
  let component: CpuTimelineComponent;
  let fixture: ComponentFixture<CpuTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
