import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItScore } from './itScore';

describe('ItScore', () => {
  let component: ItScore;
  let fixture: ComponentFixture<ItScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItScore]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ItScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
