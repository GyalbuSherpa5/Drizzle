import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureComponent} from './components/feature.component';
import {HomeComponent} from "./components/home/home.component";
import {MainCarouselComponent} from "./components/home/main-carousel/main-carousel.component";
import {HomeProductCardComponent} from "./components/home/home-product-card/home-product-card.component";
import {ProductSliderComponent} from "./components/home/product-slider/product-slider.component";
import {ProductsComponent} from './components/products/products.component';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {SharedModule} from "../shared/shared.module";
import {CartComponent} from './components/cart/cart.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {PaymentComponent} from './components/payment/payment.component';
import {PaymentSuccessComponent} from './components/payment-success/payment-success.component';
import {OrderComponent} from './components/order/order.component';
import {OrderDetailsComponent} from './components/order-details/order-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  ProductReviewCardComponent
} from './components/product-details/product-review-card/product-review-card.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AddressFormComponent} from './components/checkout/address-form/address-form.component';
import {AddressCardComponent} from './components/address-card/address-card.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { OrderCardComponent } from './components/order/order-card/order-card.component';
import { PaymentDrizzleComponent } from './components/payment-drizzle/payment-drizzle.component';
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    HomeComponent,
    FeatureComponent,
    MainCarouselComponent,
    HomeProductCardComponent,
    ProductSliderComponent,
    ProductsComponent,
    CartComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    OrderComponent,
    OrderDetailsComponent,
    ProductReviewCardComponent,
    AddressFormComponent,
    AddressCardComponent,
    OrderCardComponent,
    PaymentDrizzleComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
        MatCheckboxModule,
        MatRadioModule,
        SharedModule,
        FormsModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
    ],
    exports: [
        FeatureComponent,
        HomeComponent,
        ProductsComponent,
        OrderCardComponent
    ]
})
export class FeatureModule {
}
