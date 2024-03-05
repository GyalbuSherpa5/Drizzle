import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserKycComponent } from './view-user-kyc.component';

describe('ViewUserKycComponent', () => {
  let component: ViewUserKycComponent;
  let fixture: ComponentFixture<ViewUserKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserKycComponent]
    });
    fixture = TestBed.createComponent(ViewUserKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
