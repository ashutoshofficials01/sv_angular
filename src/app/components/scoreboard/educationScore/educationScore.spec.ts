import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationScore } from './educationScore';

describe('EducationScore', () => {
  let component: EducationScore;
  let fixture: ComponentFixture<EducationScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationScore]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EducationScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
