import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalScore } from './legalScore';

describe('LegalScore', () => {
  let component: LegalScore;
  let fixture: ComponentFixture<LegalScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalScore]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LegalScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
