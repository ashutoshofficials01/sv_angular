import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourismScore } from './tourismScore';

describe('TourismScore', () => {
  let component: TourismScore;
  let fixture: ComponentFixture<TourismScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TourismScore]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TourismScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
