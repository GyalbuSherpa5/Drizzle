import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../../../../State/service/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cart: any[] = [];
  discount: any;
  totalDiscountedPrice: any;
  totalPrice: any;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.cartService.getCart().subscribe((cartData: any) => {
      this.cart = cartData.cartItems;
      this.discount = cartData.discount;
      this.totalDiscountedPrice = cartData.totalDiscountedPrice;
      this.totalPrice = cartData.totalPrice;
    });
  }

  navigateToCheckout() {
    this.router.navigate(['checkout']).then(value => console.log("route success"));
  }

  handleCartUpdate(updatedCartData?: any) {
    // If updatedCartData is provided, update the cart data
    if (updatedCartData) {
      this.cart = updatedCartData.cartItems;
      this.discount = updatedCartData.discount;
      this.totalDiscountedPrice = updatedCartData.totalDiscountedPrice;
      this.totalPrice = updatedCartData.totalPrice;
    }
    // Otherwise, fetch the updated cart data from the service
    else {
      this.cartService.getCart().subscribe((cartData: any) => {
        this.cart = cartData.cartItems;
        this.discount = cartData.discount;
        this.totalDiscountedPrice = cartData.totalDiscountedPrice;
        this.totalPrice = cartData.totalPrice;
      });
    }
  }
}
