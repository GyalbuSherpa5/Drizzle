import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../../State/service/order.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  orders!: Order;

  steps = [
    {id: 0, title: "PLACED", isCompleted: true},
    {id: 1, title: "CONFIRMED", isCompleted: true},
    {id: 2, title: "SHIPPED", isCompleted: false},
    {id: 3, title: "DELIVERED", isCompleted: false},
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.orderService.getOrderById(id)
        .subscribe((orderData: Order) => {
          this.orders = orderData;
          console.log(orderData);
        });
    });
  }

}
