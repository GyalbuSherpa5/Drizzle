import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../../../../State/service/cart.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  products: any[] = [];
  discount: any;
  totalDiscountedPrice: any;
  totalPrice: any;

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.cartService.getCart().subscribe((cartData: any) => {
      this.products = cartData.cartItems;
      this.discount = cartData.discount;
      this.totalDiscountedPrice = cartData.totalDiscountedPrice;
      this.totalPrice = cartData.totalPrice;
    });
  }

  navigateToCheckout() {

  }
}
