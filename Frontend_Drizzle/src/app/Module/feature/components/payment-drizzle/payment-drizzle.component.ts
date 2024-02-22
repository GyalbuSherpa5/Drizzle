import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../../../State/service/order.service";

@Component({
  selector: 'app-payment-drizzle',
  templateUrl: './payment-drizzle.component.html',
  styleUrls: ['./payment-drizzle.component.scss']
})
export class PaymentDrizzleComponent {
  items = [1,1,1,1];
  order_id: any;
  orders!: Order;
  installmentMoney: any;

  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.order_id = params['order_id'];
    });

    this.orderService.getOrderById(this.order_id)
      .subscribe((orderData: Order) => {
        this.orders = orderData;
        this.installmentMoney = orderData.totalDiscountedPrice / 4;
      });
  }

  getStatusBackgroundColor(index: number): string {
    const statusIndexMap: { [key: string]: number } = {
      'PENDING': 0,
      'FIRST': 1,
      'SECOND': 2,
      'THIRD': 3
    };

    const status = this.orders?.paymentStatus || 'PENDING';
    return statusIndexMap[status] === index ? '#4CAF50' : '';
  }

  getInstallmentName(index: number): string {
    switch(index) {
      case 0:
        return 'FIRST';
      case 1:
        return 'SECOND';
      case 2:
        return 'THIRD';
      case 3:
        return 'FORTH';
      default:
        return 'Unknown';
    }
  }

  getStatusLabel(index: number): string {
    const statusIndexMap: { [key: string]: number } = {
      'PENDING': 0,
      'FIRST': 1,
      'SECOND': 2,
      'THIRD': 3
    };

    const status = this.orders?.paymentStatus || 'PENDING';

    if (statusIndexMap[status] === index) {
      return 'PENDING';
    } else if (statusIndexMap[status] > index) {
      return 'PAID';
    } else {
      return 'PENDING';
    }
  }

  makeInstallmentPayment(statusLabel: string) {
    let label = statusLabel;
    if (label === 'FORTH') {
      label = 'COMPLETED';
    }
    this.orderService.changePaymentStatus(this.order_id, label)
      .subscribe(() => {
        this.orderService.getOrderById(this.order_id)
          .subscribe((orderData: Order) => {
            this.orders = orderData;
          });
      });
  }
}
