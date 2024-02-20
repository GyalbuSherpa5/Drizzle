import {Injectable} from '@angular/core';
import {BASE_API_URL} from "../../config/api";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = BASE_API_URL + "/api";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  createOrder(reqData: any) {
    const url = `${this.apiUrl}/orders/`;
    return this.http.post(url, reqData)
      .pipe(map((data: any) => {
        console.log(data);
        if (data.id) {
          this.router.navigate([`/checkout/payment/${data.id}`], {
            queryParams: {step: '3', order_id: data.id}
          }).then(() => console.log("route success"));
        }
      }))
  }

  getOrderById(orderId: string) {
    const url = `${this.apiUrl}/orders/${orderId}`;
    return this.http.get(url, {});
  }

  getOrderHistory() {
    const url = `${this.apiUrl}/orders/user`;
    return this.http.get(url, {});
  }
}
