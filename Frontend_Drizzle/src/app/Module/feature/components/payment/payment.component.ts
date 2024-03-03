import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../../State/service/cart.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as CryptoJS from "crypto-js";
import {OrderService} from "../../../../State/service/order.service";
import {MessageService} from "../../../shared/components/MessageService";

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

  order_id: any;
  esewaForm!: FormGroup;

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private messageService: MessageService,
  ) {
    this.createForm();
  }

  ngOnInit() {

    this.router.queryParams.subscribe(params => {
      const orderId = params['order_id'];
      this.order_id = orderId;

      this.orderService.getOrderById(this.order_id).subscribe((orderData: Order) => {
        this.discount = orderData.discount;
        this.totalDiscountedPrice = orderData.totalDiscountedPrice;
        this.totalPrice = orderData.totalPrice;
        this.products = orderData.orderItems;

        let order = orderData;
        this.esewaForm.patchValue({
          success_url: `http://localhost:4200/payment-bn-pl?order_id=${orderId}`,
          amount: orderData.totalDiscountedPrice,
          total_amount: orderData.totalDiscountedPrice
        });
      });
    });
  }

  getButtonTitle(): string {
    return this.totalDiscountedPrice < 80000 ? 'Total amount should be more than 80,000 to use this feature' : '';
  }

  payViaDrizzle(orderId: string) {

    this.orderService.getOrderById(orderId)
      .subscribe((order: Order) => {
        if (order.user.kycStatus != 'APPROVED') {
          this.messageService.showErrorSnackBar('KYC not approved, redirecting to kyc verification page');
          setTimeout(() => {
            this.route.navigate(['kyc', order.user.id]).then(() => console.log("Route successful"));
          }, 2000);
        } else {
          this.route.navigate(['payment-bn-pl'], {queryParams: {order_id: orderId}})
            .then(() => console.log("route success"));
        }
      });
  }

  createForm() {
    const orderId = this.order_id;

    this.esewaForm = this.fb.group({
      amount: [0, Validators.required],
      tax_amount: [0, Validators.required],
      total_amount: [0, Validators.required],
      transaction_uuid: ['', Validators.required],
      product_code: ['EPAYTEST', Validators.required],
      product_service_charge: [0, Validators.required],
      product_delivery_charge: [0, Validators.required],
      failure_url: ['https://google.com', Validators.required],
      success_url: `http://localhost:4200/order/${orderId}`,
      signed_field_names: ['total_amount,transaction_uuid,product_code', Validators.required],
      signature: ['', Validators.required],
    });
  }

  submitMyFormBro() {
    this.generateUUIDandSignature();

    const myform = document.createElement('form');
    myform.method = 'POST';
    myform.enctype = 'application/x-www-form-urlencoded';
    myform.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
    myform.style.display = 'none';

    for (const key in this.esewaForm.value) {
      if (this.esewaForm.value.hasOwnProperty(key)) {
        const field = document.createElement('input');
        field.type = 'text';
        field.name = key;
        field.value = this.esewaForm.value[key];
        myform.appendChild(field);
      }
    }

    document.body.appendChild(myform);
    myform.submit();
  }

  generateUUIDandSignature() {

    const randomNumber = () => Math.floor(Math.random() * 10);
    const digitString = `${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}`;
    this.esewaForm.patchValue({transaction_uuid: digitString});

    let total_amount = (document.getElementById("total_amount") as HTMLInputElement)?.value;
    let transaction_uuid = (document.getElementById("transaction_uuid") as HTMLInputElement)?.value;
    let product_code = (document.getElementById("product_code") as HTMLInputElement)?.value;
    let secret = (document.getElementById("secret") as HTMLInputElement)?.value;

    let hash = CryptoJS.HmacSHA256(`total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`, `${secret}`);
    let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    this.esewaForm.patchValue({signature: hashInBase64});
  }
}
