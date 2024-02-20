import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(
    private router: Router,
  ) {
  }

  navigate(productId: any) {
    this.router.navigate(['/product-details/' + productId])
      .then(value => console.log("route success"));
  }
}
