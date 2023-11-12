import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './components/feature.component';
import {HomeComponent} from "./components/home/home.component";
import {MainCarouselComponent} from "./components/home/main-carousel/main-carousel.component";
import {HomeProductCardComponent} from "./components/home/home-product-card/home-product-card.component";
import {ProductSliderComponent} from "./components/home/product-slider/product-slider.component";

@NgModule({
  declarations: [
    HomeComponent,
    FeatureComponent,
    MainCarouselComponent,
    HomeProductCardComponent,
    ProductSliderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FeatureComponent,
    HomeComponent
  ]
})
export class FeatureModule { }
