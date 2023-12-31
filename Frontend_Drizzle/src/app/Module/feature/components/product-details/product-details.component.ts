import {Component} from '@angular/core';
import {lehngacholiPage2} from "../../../../../Data/Saree/lenghaCholiPage2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  selectedSize: any;
  reviews = [1, 1, 1];
  relatedProducts: any;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(){
    this.relatedProducts = lehngacholiPage2;
  }

  handleAddToCart() {
      this.router.navigate(['cart']).then(value => console.log("route success"));
  }
}
