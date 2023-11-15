import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FeatureModule} from "./Module/feature/feature.module";
import {SharedModule} from "./Module/shared/shared.module";
import {AdminModule} from "./Module/admin/admin.module";
import {StoreModule} from '@ngrx/store';
import {AuthModule} from "./Module/auth/auth.module";
import {authReducer} from "./State/Auth/auth.reducer";
import {userReducer} from "./State/User/user.reducer";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./config/auth-interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatureModule,
    SharedModule,
    AdminModule,
    AuthModule,
    StoreModule.forRoot({auth: authReducer, user: userReducer}),
    HttpClientModule
  ],
  providers: [[{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]],
  bootstrap: [AppComponent]
})
export class AppModule {
}
