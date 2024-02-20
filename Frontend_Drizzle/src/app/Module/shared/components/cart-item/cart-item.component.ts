import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartService} from "../../../../State/service/cart.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {

  @Input() showButton: any;
  @Input() cartDetail: any;
  @Output() cartUpdated: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private cartService: CartService
  ) {
  }

  updateCartItem(number: number) {
    this.cartDetail.quantity = number + this.cartDetail.quantity;
    this.cartService.updateCartItem(
      {
        cartItemId: this.cartDetail.id,
        data: {
          quantity: this.cartDetail.quantity
        }
      }
    ).subscribe(() => {
      // Fetch the updated cart data after updating the item
      this.cartService.getCart().subscribe((updatedCartItem: any) => {
        // Emit the updated cart data to the parent component
        this.cartUpdated.emit(updatedCartItem);
      });
    });
  }

  removeCartItem() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to remove this item?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.removeCartItem(this.cartDetail.id)
          .subscribe(() => {
            console.log("item removed");
          });
      }
    });
  }
}
