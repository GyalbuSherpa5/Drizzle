import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../../../State/service/order.service";
import {Router} from "@angular/router";
import {CartService} from "../../../../../State/service/cart.service";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {
  address = [1, 1, 1];
  myForm: FormGroup = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    streetAddress: ["", Validators.required],
    city: ["", Validators.required],
    state: ["", Validators.required],
    zipCode: ["", Validators.required],
    mobile: ["", Validators.required],
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService
  ) {
  }

  handleCreateOrder(item: any) {

  }

  handleSubmit() {
    const formValue = this.myForm.value;
    this.orderService.createOrder(formValue)
      .subscribe();
  }
}
