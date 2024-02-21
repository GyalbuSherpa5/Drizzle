import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../../../State/service/order.service";

@Component({
  selector: 'app-payment-drizzle',
  templateUrl: './payment-drizzle.component.html',
  styleUrls: ['./payment-drizzle.component.scss']
})
export class PaymentDrizzleComponent {
  items = [1];
  order_id: any;
  orders!: Order;

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
      });
  }
}
