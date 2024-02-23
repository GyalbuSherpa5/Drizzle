import {Injectable} from '@angular/core';
import {BASE_API_URL} from "../../config/api";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewRatingService {

  private apiUrl = BASE_API_URL + "/api";

  constructor(
    private http: HttpClient,
  ) {
  }

  addRating(reqData: RatingRequest): Observable<Rating> {
    const url = `${this.apiUrl}/ratings/create`;
    return this.http.post<Rating>(url, reqData);
  }

  addReview(reqData: ReviewRequest): Observable<Review> {
    const url = `${this.apiUrl}/reviews/create`;
    return this.http.post<Review>(url, reqData);
  }

}
