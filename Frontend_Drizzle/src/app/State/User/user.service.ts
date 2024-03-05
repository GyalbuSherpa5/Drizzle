import {Injectable} from '@angular/core';
import {BASE_API_URL} from "../../config/api";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {catchError, map, of} from "rxjs";
import {getUserProfileFailure, getUserProfileSuccess, logoutSuccess} from "./user.action";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = BASE_API_URL + "/api";

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
  ) {
  }

  getUserProfile() {
    return this.http.get(`${this.apiUrl}/users/profile`, {})
      .pipe(
        map((user: any) => {
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


  logout() {
    localStorage.removeItem("jwt");
    this.store.dispatch(logoutSuccess());
    this.router.navigate(['']).then(value => console.log("route success"));
  }

  findAllUsers() {
    return this.http.get(`${this.apiUrl}/users/all`)
  }

  getAllUnverifiedUser() {
    return this.http.get(`${this.apiUrl}/users/getAllUnverifiedUsers`)
  }

  changeKycStatus(userId: number, kycStatus: string) {
    return this.http.post(`${this.apiUrl}/users/${userId}/${kycStatus}`, {})
  }

  uploadKyc(value: any, fileToUpload: File, fileToUploadB: File) {
    const formData = new FormData();
    if (fileToUpload && fileToUploadB) {

      formData.append('citizenFront', fileToUpload);
      formData.append('citizenBack', fileToUploadB);
      formData.append('userKycRequest', new Blob([JSON.stringify(value)],
        {type: 'application/json'}));
    }

    return this.http.post(`${this.apiUrl}/users/kyc`, formData);
  }

  getUserKyc(userId: any) {
    return this.http.get(`${this.apiUrl}/users/kyc/${userId}`);
  }
}
