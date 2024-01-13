import {Injectable} from '@angular/core';
import {BASE_API_URL} from "../../config/api";
import {HttpClient} from "@angular/common/http";
import {CreateProductRequestDTO} from "./models/adminModel";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminProduct = BASE_API_URL + "/api/admin/products";

  constructor(
    private http: HttpClient,
  ) {
  }

  addProduct(reqData: CreateProductRequestDTO) {
    return this.http.post(`${this.adminProduct + "/"}`, reqData);
  }
}
