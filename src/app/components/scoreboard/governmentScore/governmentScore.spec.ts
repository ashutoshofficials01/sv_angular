import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentScore } from './governmentScore';

describe('GovernmentScore', () => {
  let component: GovernmentScore;
  let fixture: ComponentFixture<GovernmentScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GovernmentScore]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GovernmentScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
