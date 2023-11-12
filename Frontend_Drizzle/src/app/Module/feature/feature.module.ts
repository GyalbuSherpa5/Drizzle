import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './components/feature.component';
import {HomeComponent} from "./components/home/home.component";
import {MainCarouselComponent} from "./components/home/main-carousel/main-carousel.component";
import {HomeProductCardComponent} from "./components/home/home-product-card/home-product-card.component";
import {ProductSliderComponent} from "./components/home/product-slider/product-slider.component";
import { ProductsComponent } from './components/products/products.component';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    HomeComponent,
    FeatureComponent,
    MainCarouselComponent,
    HomeProductCardComponent,
    ProductSliderComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    SharedModule
  ],
  exports:[
    FeatureComponent,
    HomeComponent,
    ProductsComponent
  ]
})
export class FeatureModule { }
