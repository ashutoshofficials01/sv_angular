import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessScore } from './businessScore';

describe('BusinessScore', () => {
  let component: BusinessScore;
  let fixture: ComponentFixture<BusinessScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessScore]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BusinessScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});