import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsGeographyComponent } from './analytics-geography.component';

describe('AnalyticsGeographyComponent', () => {
  let component: AnalyticsGeographyComponent;
  let fixture: ComponentFixture<AnalyticsGeographyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticsGeographyComponent]
    });
    fixture = TestBed.createComponent(AnalyticsGeographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
