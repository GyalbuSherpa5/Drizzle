import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {

  @Input() orderItems!: OrderItem;
  @Input() orderStatus!: any;
  @Input() payingAmount!: any;
}
