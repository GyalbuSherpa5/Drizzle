import {Injectable} from '@angular/core';
import {BASE_API_URL} from "../../config/api";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {catchError, map, of} from "rxjs";
import {getUserProfileFailure, getUserProfileSuccess} from "./user.action";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = BASE_API_URL + "/api";

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {
  }

  getUserProfile() {
    return this.http.get(`${this.apiUrl}/users/profile`,{})
      .pipe(
        map((user: any) => {
          console.log("User Profile Success ", user)
          return getUserProfileSuccess({userProfile: user});
        }),
        catchError((error) => {
          return of(
            getUserProfileFailure(
              error.response && error.response.data.message ?
                error.response.data.message : error.message)
          )
        })
      ).subscribe((action) => this.store.dispatch(action));
  }
}
