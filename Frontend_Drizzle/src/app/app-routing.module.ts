import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./Module/feature/components/home/home.component";
import {ProductsComponent} from "./Module/feature/components/products/products.component";
import {CartComponent} from "./Module/feature/components/cart/cart.component";
import {ProductDetailsComponent} from "./Module/feature/components/product-details/product-details.component";
import {CheckoutComponent} from "./Module/feature/components/checkout/checkout.component";
import {PaymentComponent} from "./Module/feature/components/payment/payment.component";
import {PaymentSuccessComponent} from "./Module/feature/components/payment-success/payment-success.component";
import {OrderComponent} from "./Module/feature/components/order/order.component";
import {OrderDetailsComponent} from "./Module/feature/components/order-details/order-details.component";
import {AdminRoutingModule} from "./Module/admin/admin-routing.module";
import {authGuard} from "./config/auth.guard";
import {PaymentDrizzleComponent} from "./Module/feature/components/payment-drizzle/payment-drizzle.component";
import {InstallmentComponent} from "./Module/shared/components/installment/installment.component";
import {UserAgreementComponent} from "./Module/auth/user-agreement/user-agreement.component";
import {PrivacyPolicyComponent} from "./Module/auth/privacy-policy/privacy-policy.component";
import {UserKycComponent} from "./Module/auth/user-kyc/user-kyc.component";
import {ViewUserKycComponent} from "./Module/auth/user-kyc/view-user-kyc/view-user-kyc.component";

const routes: Routes = [
  {
    path: "admin", loadChildren: () => import("./Module/admin/admin-routing.module")
      .then(m => AdminRoutingModule), canActivate: [authGuard],data: {
      roles: ['SUPER_ADMIN']
    }
  },
  {path: "", component: HomeComponent},
  {path: "cart", component: CartComponent},
  {path: "product-details/:id", component: ProductDetailsComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: "checkout/payment/:id", component: PaymentComponent},
  {path: "payment-success", component: PaymentSuccessComponent},
  {path: "payment-bn-pl", component: PaymentDrizzleComponent},
  {path: "installments", component: InstallmentComponent},
  {path: "account/orders", component: OrderComponent},
  {path: "order/:id", component: OrderDetailsComponent},
  {path: ':levelOne/:levelTwo/:levelThree', component: ProductsComponent},
  {path: 'agreement', component: UserAgreementComponent},
  {path: 'policy', component: PrivacyPolicyComponent},
  {path: 'kyc/:id', component: UserKycComponent},
  {path: 'verify-kyc/:id', component: ViewUserKycComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
