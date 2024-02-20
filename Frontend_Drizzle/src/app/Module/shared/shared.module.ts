import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {NavContentComponent} from "./components/navbar/nav-content/nav-content.component";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { ProductCardComponent } from './components/product-card/product-card.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderTrackerComponent } from './components/order-tracker/order-tracker.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NavContentComponent,
    FooterComponent,
    ProductCardComponent,
    StarRatingComponent,
    CartItemComponent,
    OrderTrackerComponent,
    ConfirmDialogComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatDividerModule,
        MatDialogModule,
        RouterLink,
    ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    StarRatingComponent,
    CartItemComponent,
    OrderTrackerComponent
  ]
})
export class SharedModule { }
