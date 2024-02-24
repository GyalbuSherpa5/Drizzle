import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsSalesReportComponent } from './analytics-sales-report.component';

describe('AnalyticsSalesReportComponent', () => {
  let component: AnalyticsSalesReportComponent;
  let fixture: ComponentFixture<AnalyticsSalesReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticsSalesReportComponent]
    });
    fixture = TestBed.createComponent(AnalyticsSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
