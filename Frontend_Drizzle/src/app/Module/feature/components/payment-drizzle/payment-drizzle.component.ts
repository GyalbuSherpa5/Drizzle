import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../../State/service/order.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as CryptoJS from "crypto-js";

@Component({
  selector: 'app-payment-drizzle',
  templateUrl: './payment-drizzle.component.html',
  styleUrls: ['./payment-drizzle.component.scss']
})
export class PaymentDrizzleComponent {
  items = [1, 1, 1, 1];
  order_id: any;
  orders!: Order;
  installmentMoney: any;
  installmentStatus: any;

  esewaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const orderId = params['order_id'];
      this.order_id = orderId;
      this.esewaForm.patchValue({
        success_url: `http://localhost:4200/payment-bn-pl?order_id=${orderId}`
      });

      console.log('order_id', orderId);
      if (orderId.includes('data')) {
        const newOrderId = orderId.split('?')[0];
        const retrievedString = localStorage.getItem('installmentStatus')!;
        this.orderService.changePaymentStatus(newOrderId, retrievedString)
          .subscribe(() => {
            localStorage.removeItem('installmentStatus');
            this.orderService.getOrderById(this.order_id)
              .subscribe((orderData: Order) => {
                this.orders = orderData;
              });
          });
      }

      const newUrl = orderId.split('?')[0];
      this.orderService.getOrderById(this.order_id).subscribe((orderData: Order) => {
        this.orders = orderData;
        this.installmentMoney = orderData.totalDiscountedPrice / 4;
      });

      this.router.navigate(['payment-bn-pl'], { queryParams: { order_id: newUrl } })
        .then(() => console.log("route success"));
    });
  }

  getStatusBackgroundColor(index: number): string {
    const statusIndexMap: { [key: string]: number } = {
      'PENDING': 0,
      'FIRST': 1,
      'SECOND': 2,
      'THIRD': 3
    };

    const status = this.orders?.paymentStatus || 'PENDING';
    return statusIndexMap[status] === index ? '#4CAF50' : '';
  }

  getInstallmentName(index: number): string {
    switch(index) {
      case 0:
        return 'FIRST';
      case 1:
        return 'SECOND';
      case 2:
        return 'THIRD';
      case 3:
        return 'FORTH';
      default:
        return 'Unknown';
    }
  }

  getStatusLabel(index: number): string {
    const statusIndexMap: { [key: string]: number } = {
      'PENDING': 0,
      'FIRST': 1,
      'SECOND': 2,
      'THIRD': 3
    };

    const status = this.orders?.paymentStatus || 'PENDING';

    if (statusIndexMap[status] === index) {
      return 'PENDING';
    } else if (statusIndexMap[status] > index) {
      return 'PAID';
    } else {
      return 'PENDING';
    }
  }

  createForm() {
    const orderId = this.order_id;

    this.esewaForm = this.fb.group({
      amount: [100, Validators.required],
      tax_amount: [10, Validators.required],
      total_amount: [110, Validators.required],
      transaction_uuid: ['', Validators.required],
      product_code: ['EPAYTEST', Validators.required],
      product_service_charge: [0, Validators.required],
      product_delivery_charge: [0, Validators.required],
      failure_url: ['https://google.com', Validators.required],
      success_url: `http://localhost:4200/payment-bn-pl?order_id=${orderId}`,
      signed_field_names: ['total_amount,transaction_uuid,product_code', Validators.required],
      signature: ['', Validators.required],
    });
  }

  makeInstallmentPayment(event: any) {
    const index = Array.from(event.target.closest('.text-white').parentElement.children).indexOf(event.target.closest('.text-white'));

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
    let label = this.getInstallmentName(index);
    if (label === 'FORTH') {
      label = 'COMPLETED';
    }

    this.installmentStatus = label;
    localStorage.setItem('installmentStatus', this.installmentStatus);
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
