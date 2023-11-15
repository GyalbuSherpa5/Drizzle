import {Injectable} from '@angular/core';
import {BASE_API_URL} from "../../config/api";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = BASE_API_URL + "/api";

  constructor(
    private http: HttpClient,
  ) {
  }

  findProductByCategory(reqData: any) {
    const {
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = reqData;

    let params = new HttpParams()
      .set("color", colors)
      .set("size", sizes)
      .set("minPrice", minPrice)
      .set("maxPrice", maxPrice)
      .set("minDiscount", minDiscount)
      .set("category", category)
      .set("category", stock)
      .set("sort", sort)
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize);

    return this.http.get(`${this.apiUrl}/products`, {params});
  }

  findProductById(productId: any) {
    return this.http.get(`${this.apiUrl}/products/id/${productId}`, {});
  }
}
