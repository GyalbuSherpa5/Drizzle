import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {OrderService} from "../../../../State/service/order.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  orders!: Order;

  steps = [
    {id: 0, title: "PLACED"},
    {id: 1, title: "CONFIRMED"},
    {id: 2, title: "SHIPPED"},
    {id: 3, title: "DELIVERED"},
  ]
  activeStep: string = '';

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
          this.setActiveStep(orderData.orderStatus);
        });
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  setActiveStep(orderStatus: string) {
    switch (orderStatus) {
      case 'PENDING':
        this.activeStep = 'PLACED';
        break;
      case 'CONFIRMED':
        this.activeStep = 'CONFIRMED';
        break;
      case 'SHIPPED':
        this.activeStep = 'SHIPPED';
        break;
      case 'DELIVERED':
        this.activeStep = 'DELIVERED';
        break;
      default:
        this.activeStep = '';
    }
  }

}
