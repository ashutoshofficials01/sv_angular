import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionScore } from './constructionScore';

describe('ConstructionScore', () => {
  let component: ConstructionScore;
  let fixture: ComponentFixture<ConstructionScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConstructionScore]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConstructionScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});