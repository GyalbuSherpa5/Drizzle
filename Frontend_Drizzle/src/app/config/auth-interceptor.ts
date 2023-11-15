import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest = req;
    let token = localStorage.getItem("jwt");
    if (token != null) {
      newRequest = newRequest.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
    return next.handle(newRequest);
  }
}
