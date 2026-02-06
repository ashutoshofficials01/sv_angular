import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignScore } from './designScore';

describe('DesignScore', () => {
  let component: DesignScore;
  let fixture: ComponentFixture<DesignScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignScore]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DesignScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
