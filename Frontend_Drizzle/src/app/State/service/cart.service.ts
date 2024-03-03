import {Injectable} from '@angular/core';
import {BASE_API_URL} from "../../config/api";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = BASE_API_URL + "/api";

  constructor(
    private http: HttpClient,
  ) {
  }

  addItemToCart(reqData: any) {
    const url = `${this.apiUrl}/cart/add`;
    return this.http.put(url, reqData);
  }

  getCart() {
    const url = `${this.apiUrl}/cart/`;
    return this.http.get(url, {});
  }

  getCartById(cartId: number) {
    const url = `${this.apiUrl}/cart/${cartId}`;
    return this.http.get(url, {});
  }

  removeCartItem(cartItemId: number) {
    const url = `${this.apiUrl}/cart_items/${cartItemId}`;
    return this.http.delete(url, {});
  }

  updateCartItem(reqData: any) {
    const url = `${this.apiUrl}/cart_items/${reqData.cartItemId}`;
    const body = reqData.data;
    return this.http.put(url, body);
  }
}
