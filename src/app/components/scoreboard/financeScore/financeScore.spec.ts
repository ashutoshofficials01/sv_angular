import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceScore } from './financeScore';

describe('FinanceScore', () => {
  let component: FinanceScore;
  let fixture: ComponentFixture<FinanceScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinanceScore]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinanceScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
