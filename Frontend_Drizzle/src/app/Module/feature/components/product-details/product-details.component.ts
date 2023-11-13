import {Component} from '@angular/core';
import {lehngacholiPage2} from "../../../../../Data/Saree/lenghaCholiPage2";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  selectedSize: any;
  reviews = [1, 1, 1];
  relatedProducts: any;

  ngOnInit(){
    this.relatedProducts = lehngacholiPage2;
  }

  handleAddToCart() {

  }
}
