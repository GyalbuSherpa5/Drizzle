import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDrizzleComponent } from './payment-drizzle.component';

describe('PaymentDrizzleComponent', () => {
  let component: PaymentDrizzleComponent;
  let fixture: ComponentFixture<PaymentDrizzleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentDrizzleComponent]
    });
    fixture = TestBed.createComponent(PaymentDrizzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
