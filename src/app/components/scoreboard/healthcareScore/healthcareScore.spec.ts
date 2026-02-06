import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareScore } from './healthcareScore';

describe('HealthcareScore', () => {
  let component: HealthcareScore;
  let fixture: ComponentFixture<HealthcareScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthcareScore]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HealthcareScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
