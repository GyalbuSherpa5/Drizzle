import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../../State/service/order.service";

@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.scss']
})
export class InstallmentComponent {

  orders!: Order[];
  discount: any;
  totalDiscountedPrice: any;
  totalPrice: any;

  constructor(
    private route: Router,
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.orderService.getAllInstallmentOrders()
      .subscribe((orderData: Order[]) => {
        this.orders = orderData;
      });
  }

  navigateToDrizzleInstallment(id: number) {
    this.route.navigate(['payment-bn-pl'], { queryParams: { order_id: id } })
      .then(() => console.log("route success"));
  }
}
