import {Injectable} from '@angular/core';
import {BASE_API_URL} from "../../../config/api";
import {HttpClient} from "@angular/common/http";
import {CreateProductRequestDTO} from "../models/adminModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminProduct = BASE_API_URL + "/api/admin/products";
  private adminOrder = BASE_API_URL + "/api/admin/orders/";

  constructor(
    private http: HttpClient,
  ) {
  }

  addProduct(reqData: CreateProductRequestDTO) {
    return this.http.post(`${this.adminProduct + "/"}`, reqData);
  }

  getAllProducts() {
    return this.http.get(`${this.adminProduct + "/all"}`);
  }

  changeOrderStatus(orderId: number, status: string) {
    return this.http.put(`${this.adminOrder + orderId + "/" + status}`, {});
  }

  getAllOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.adminOrder}`);
  }
}
