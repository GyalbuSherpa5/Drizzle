import {Injectable} from '@angular/core';
import {BASE_API_URL} from "../../config/api";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {catchError, map, of, retry} from "rxjs";
import {loginFailure, loginSuccess, registerFailure, registerSuccess} from "./auth.actions";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = BASE_API_URL + "/auth";

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("jwt");
    return jwtHelper.decodeToken(token!);
  }

  getRole() {
    return this.decodedToken().role;
  }

  isLoggedIn() {
    return !!localStorage.getItem("jwt");

  }

  login(loginData: any) {
    return this.http.post(`${this.apiUrl}/sign_in`, loginData)
      .pipe(
        map((user: any) => {
          if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
          }
          return loginSuccess({user});
        }),
        catchError((error) => {
          return of(
            loginFailure(
              error.response && error.response.data.message ?
                error.response.data.message : error.message)
          )
        })
      ).subscribe((action) => this.store.dispatch(action));
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/sign_up`, user)
      .pipe(
        map((user: any) => {
          if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
          }
          return registerSuccess({user});
        }),
        catchError((error) => {
          return of(
            registerFailure(
              error.response && error.response.data.message ?
                error.response.data.message : error.message)
          )
        })
      ).subscribe((action) => this.store.dispatch(action));
  }
}
