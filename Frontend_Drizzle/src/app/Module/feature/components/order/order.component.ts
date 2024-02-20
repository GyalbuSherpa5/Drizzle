import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../../../State/service/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  orderFilter = [
    {value: "on_the_way", label: "On The Way"},
    {value: "delivered", label: "Delivered"},
    {value: "cancelled", label: "Cancelled"},
    {value: "returned", label: "Returned"},
  ]

  orders: Order[] = [];
  discount: any;
  totalDiscountedPrice: any;
  totalPrice: any;

  constructor(
    private router: Router,
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.orderService.getOrderHistory()
      .subscribe((orderData: Order[]) => { // Expecting an array of orders
        this.orders = orderData;
        console.log(orderData);
      });
  }

  navigateToOrderDetails(id: number) {
    console.log(id);
    this.router.navigate([`/order/${id}`]).then(() => console.log("route success"));
  }
}
